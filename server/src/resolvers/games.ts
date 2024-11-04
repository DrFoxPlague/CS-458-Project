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
        createGame: async (
            _: any,
            { input }: { input: GameDataInput },
            context: { staff: { id: string } }
        ) => {
            try {
                // check if user is staff
                if (!context.staff) {
                    throw new GraphQLError("Not authenticated!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message: "Staff member not authenticated!"
                                }
                            ]
                        }
                    });
                }

                const game = new GameModel({
                    id: GenID.game(),
                    game_name: input.game_name,
                    game_subject: input.game_subject,
                    questions: []
                });

                await game.save();

                return game;

            } catch (err) {
                throw err;
            }
        },

        updateGame: async (
            _: any,
            { id, input }: { id: string, input: Partial<GameDataInput> },
            context: { staff: { id: string } }
        ) => {
            try {
                if (!context.staff) {
                    throw new GraphQLError("Not authenticated!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message: "Staff member not authenticated!"
                                }
                            ]
                        }
                    });
                }

                const game = await GameModel.findById(id);

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

                if (input.game_name) game.game_name = input.game_name;
                if (input.game_subject) game.game_subject = input.game_subject;

                await game.save();

                return game;

            } catch (err) {
                throw err;
            }
        },

        deleteGame: async (
            _: any,
            { id }: { id: string },
            context: { staff: { id: string } }
        ) => {
            try {
                if (!context.staff) {
                    throw new GraphQLError("Not authenticated!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message: "Staff member not authenticated!"
                                }
                            ]
                        }
                    });
                }

                const game = GameModel.findById(id);

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

                await GameModel.findByIdAndDelete(id);

                return game;

            } catch (err) {
                throw err;
            }
        },

        createTrivQues: async (
            { input }: { input: QuestionInput },
            context: { staff: { id: string } }
        ) => {
            try {
                if (!context.staff) {
                    throw new GraphQLError("Not authenticated!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message: "Staff member not authenticated!"
                                }
                            ]
                        }
                    });
                }

                const triviaQuestion = new TriviaQuestionModel({
                    
                });

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
        },

        addQuestion: async () => {
            try {

            } catch (err) {
                throw err;
            }
        },

        removeQuestion: async () => {
            try {

            } catch (err) {
                throw err;
            }
        }
    }
}