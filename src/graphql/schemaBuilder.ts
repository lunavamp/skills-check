import { readFileSync } from "fs";
import { join } from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "@/graphql/resolvers";

export function createSchema() {
  const typeDefs = readFileSync(
    join(process.cwd(), "src", "graphql", "schema.graphql"),
    "utf8"
  );
  return makeExecutableSchema({ typeDefs, resolvers });
}
