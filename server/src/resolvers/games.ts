import GameModel from "../schemas/Game/Game";
import TriviaQuestionModel from "../schemas/Game/TriviaQuestion";
import { GraphQLError } from "graphql";
import GenID from "../util/GenID";

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
        getGame: async (_: any, { id }: { id: string }) => {
            try {
                // fetch game object
                const game = await GameModel.findOne({ id });

                if (!game) {
                    throw new GraphQLError("Game not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "game",
                                    message: "Game not found!"
                                }
                            ]
                        }
                    });
                }

                // fetch questions
                const questionSelection = [...game.questions];

                // retrieve only 5 random questions
                game.questions = questionSelection.sort(() => 0.5 - Math.random()).slice(0,5);

                return game;

            } catch(err) {
                throw err;
            }
        },

        getGames: async () => (await GameModel.find()).toSorted()
    },
    Mutation: {
        createGame: async () => {
            try {

            } catch (err) {
                throw err;
            }
        },

        updateGame: async () => {
            try {

            } catch (err) {
                throw err;
            }
        },

        deleteGame: async () => {
            try {

            } catch (err) {
                throw err;
            }
        },

        createTrivQues: async () => {
            try {

            } catch (err) {
                throw err;
            }
        },

        updateTrivQues: async () => {
            try {

            } catch (err) {
                throw err;
            }
        },

        deleteTrivQues: async () => {
            try {

            } catch (err) {
                throw err;
            }
        }
    }
}