import { NextApiRequest, NextApiResponse } from "next";
import { createYoga } from "graphql-yoga";
import { createSchema } from "@/graphql/schemaBuilder";

export const config = {
  api: { bodyParser: false },
};

const yoga = createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: createSchema(),
  graphqlEndpoint: "/api/graphql",
  graphiql: process.env.NODE_ENV !== "production",
});

export function GET(req: NextApiRequest, res: NextApiResponse) {
  return yoga(req, res);
}

export function POST(req: NextApiRequest, res: NextApiResponse) {
  return yoga(req, res);
}
