import express from "express";
import cors from "cors";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph";
import mongoose from "mongoose";
import Database from "./util/Database";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/main";

const PORT = process.env.PORT || 4000;  // assign a random port if 4000 is not available
const app = express();
const db = new Database();

const typeDefs = gql(
    readFileSync("src/graphql/schemas.gql", {
        encoding: "utf-8",
    })
);

const server = new ApolloServer({
    schema: buildSubgraphSchema({typeDefs, resolvers})
});

await server.start();
await db.connect();

app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server)
);

app.listen(PORT, () => {
    console.log(`Server functional on port: ${PORT}`);
});