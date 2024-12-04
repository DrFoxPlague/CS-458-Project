// MAIN FILE FOR ALL RESOLVERS(tells what the schemas should do)

import exhibits from "./exhibits";
//import staff from "./staff";
import user from "./user";
import games from "./games";
import badges from "./badges";
import google from "./auth";
import BadgeModel from "../schemas/Badge";
import GameModel from "../schemas/Game/Game";
import ExhibitModel from "../schemas/Exhibit";
import TriviaQuestionModel from "../schemas/Game/TriviaQuestion";
import shuffle from "lodash/shuffle";

export const resolvers = {
    User: {
        badges: async (parent: any) =>
            await BadgeModel.find({ _id: { $in: parent.badges } }),
    },
    Exhibit: {
        game: async (parent: any) => await GameModel.findById(parent.game),
        badge: async (parent: any) => await BadgeModel.findById(parent.badge),
    },
    Game: {
        exhibit: async (parent: any) =>
            await ExhibitModel.findById(parent.exhibit),
        questions: async (parent: any) =>
            shuffle(
                await TriviaQuestionModel.find({
                    _id: { $in: parent.questions },
                })
            ).slice(0, 5),
    },
    TriviaQuestion: {
        game: async (parent: any) => await GameModel.findById(parent.game),
    },
    Badge: {
        exhibits: async (parent: any) =>
            await ExhibitModel.findById(parent.exhibit),
    },
    Query: {
        ...exhibits.Query,
        //...staff.Query,
        ...user.Query,
        ...games.Query,
        ...badges.Query,
    },
    Mutation: {
        ...exhibits.Mutation,
        //...staff.Mutation,
        ...user.Mutation,
        ...games.Mutation,
        ...badges.Mutation,
        ...google.Mutation,
    },
} as any;
