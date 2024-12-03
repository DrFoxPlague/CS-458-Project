// MAIN FILE FOR ALL RESOLVERS(tells what the schemas should do)

import exhibits from "./exhibits";
//import staff from "./staff";
import user from "./user";
import games from "./games";
import badges from "./badges";
import google from "./auth";
import UserModel from "../schemas/User";
import BadgeModel from "../schemas/Badge";

export const resolvers = {
    User: {
        badges: async (parent: any) => await BadgeModel.find({ _id: { $in: parent.badges } }),
    },
    Query: {
        ...exhibits.Query,
        //...staff.Query,
        ...user.Query,
        ...games.Query,
        ...badges.Query
    },
    Mutation: {
        ...exhibits.Mutation,
        //...staff.Mutation,
        ...user.Mutation,
        ...games.Mutation,
        ...badges.Mutation,
        ...google.Mutation
    }
} as any;