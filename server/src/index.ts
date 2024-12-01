import express from "express";
import cors from "cors";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware, type ExpressContextFunctionArgument } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph";
import mongoose from "mongoose";
import Database from "./util/Database";
import session from "express-session"; // session management
import passport from "passport"; // authentication tool
import "./util/Auth";
import { googleAuth, googleCallback, isAuthenticated } from "./util/Auth"; // import route handlers
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/main";
import type { User } from "./util/Types";

const PORT = process.env.PORT || 4000;  // assign a random port if 4000 is not available
const app = express();
const db = new Database();

// Connect to GQL file
const typeDefs = gql(
    readFileSync("src/graphql/schemas.gql", {
        encoding: "utf-8",
    })
);

// set up Apollo Server
const server = new ApolloServer({
    schema: buildSubgraphSchema({typeDefs, resolvers})
});

// Start essential connections
await server.start();
await db.connect();

// Session and Passport initialization
app.use(
    session({
        secret: process.env.SESSION_SECRET || "defaultsecret",
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24,
         }, // Set `secure: true` in production with HTTPS
    }),
    passport.initialize(),
    passport.session()
);

// Authentication routes
app.get("/auth/google", googleAuth);
app.get("/auth/google/callback", googleCallback);

// Set up middleware and GQL
app.use(
    '/graphql',
    cors({
        origin: "http://localhost:5173", 
        credentials: true
    }),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }: ExpressContextFunctionArgument) => {
            return {
                isStaff: req.user ? (req.user as User).is_staff : false,
                auth: !!req.user,
                user: req.user || null,
                req
            }
        }
    })
);

app.listen(PORT, () => {
    console.log(`Server functional on port: ${PORT}`);
});