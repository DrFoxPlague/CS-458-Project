import express from "express";
import cors from "cors";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph";
import mongoose from "mongoose";
import Database from "./util/Database";
import session from "express-session"; // session management
import passport from "passport"; // authentication tool
import "./util/Auth";
import { googleAuth, googleCallback, isAuthenticated } from "./util/Auth"; // import route handlers
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
    schema: buildSubgraphSchema({typeDefs, resolvers}
    )
});

await server.start();
await db.connect();

// Session and Passport initialization
app.use(
    session({
        secret: process.env.SESSION_SECRET || "defaultsecret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set `secure: true` in production with HTTPS
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Authentication routes
app.get("/auth/google", googleAuth);
app.get("/auth/google/callback", googleCallback);

app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server)
);

app.listen(PORT, () => {
    console.log(`Server functional on port: ${PORT}`);
});