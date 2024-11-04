import StaffModel from "../schemas/Staff";
import { GraphQLError } from "graphql";

export default {
    Query: {
        getStaff: async () => {},
        getStaffMembers: async () => {}
    },
    Mutation: {
        createStaff: async () => {},
        updateStaff: async () => {},
        deleteStaff: async () => {},
    }
}