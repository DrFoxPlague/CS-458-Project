import GameModel from "../schemas/Game";
import { GraphQLError } from "graphql";

type GameDataInput = {
    game_name: string;
    game_subject: string;
}

type QuestionInput = {
    question: string;
    choices: string[];
    answer: string;
}

export default {
    Query: {
        getGame: async () => {},
        getGames: async () => {}
    },
    Mutation: {
        createGame: async () => {},
        updateGame: async () => {},
        deleteGame: async () => {}
    }
}