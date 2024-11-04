import UserModel from "../schemas/User";
import { GraphQLError } from "graphql";

export default {
    Query: {
        getUser: async () => {},
        getUsers: async () => {}
    },
    Mutation: {
        createUser: async () => {},
        updateUser: async () => {},
        deleteUser: async () => {}
    }
}