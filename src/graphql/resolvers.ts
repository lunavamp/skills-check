import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

interface Context {
  req: NextApiRequest;
}

// userId Authorizationа
function getUserId(context: Context): string {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) {
    throw new Error("Authorization header missing");
  }
  const token = authHeader.replace(/^Bearer\s+/i, "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    // Предполагаем, что мы подписали { userId }
    return (payload as any).userId;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}

export const resolvers = {
  Query: {

    tests: () => prisma.test.findMany(),


    test: (_parent: any, args: { id: string }) =>
      prisma.test.findUnique({ where: { id: args.id } }),

    me: (_parent: any, _args: any, context: Context) => {
      const userId = getUserId(context);
      return prisma.user.findUnique({ where: { id: userId } });
    },
  },


  Test: {
    questions: (parent: { id: string }) =>
      prisma.question.findMany({
        where: { testId: parent.id },
        include: { options: true },
      }),
  },


  Question: {
    options: (parent: { id: string }) =>
      prisma.option.findMany({ where: { questionId: parent.id } }),
  },

  Mutation: {
   
    register: async (
      _parent: any,
      args: { username: string; email: string; password: string }
    ) => {
      const hash = await bcrypt.hash(args.password, 10);
      const user = await prisma.user.create({
        data: {
          username: args.username,
          email: args.email,
          password: hash,
        },
      });
      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
    },


    login: async (_parent: any, args: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!user) {
        throw new Error("No user found with this email");
      }
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error("Invalid credentials");
      }
      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
    },

    
    submitResult: (
      _parent: any,
      args: { testId: string; score: number },
      context: Context
    ) => {
      const userId = getUserId(context);
      return prisma.result.create({
        data: {
          testId: args.testId,
          userId,
          score: args.score,
        },
      });
    },
  },
};
