import express from "express";
import cors from "cors";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;  // assign a random port if 3000 is not available
const app = express();