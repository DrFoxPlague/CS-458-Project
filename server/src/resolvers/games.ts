import GameModel from "../schemas/Game/Game";
import TriviaQuestionModel from "../schemas/Game/TriviaQuestion";
import { GraphQLError } from "graphql";
import GenID from "../util/GenID";
import ExhibitModel from "../schemas/Exhibit";

import shuffle from "lodash/shuffle";

type GameDataInput = {
    name: string;
    subject: string;
    exhibit: string;
};

type QuestionInput = {
    question: string;
    choices: string[];
    answer: string;
    game: string;
};

export default {
    Query: {
        getGame: async (_: any, { id }: { id: string }) => {
            try {
                // fetch game object
                // const game = await GameModel.findOne({ id }); // We need to use findById
                const game = await GameModel.findById(id);

                if (!game) {
                    throw new GraphQLError("Game not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "game",
                                    message: "Game not found!",
                                },
                            ],
                        },
                    });
                }

                return game;
            } catch (err) {
                throw err;
            }
        },

        getGames: async () => (await GameModel.find()).toSorted(),

        checkQuestion: async (
            _: any,
            { id, answer }: { id: string; answer: string }
        ) => {
            try {
                const triviaQuestion = await TriviaQuestionModel.findById(id);

                if (!triviaQuestion) {
                    throw new GraphQLError("Trivia question not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "trivia question",
                                    message: "Trivia question not found!",
                                },
                            ],
                        },
                    });
                }

                return triviaQuestion.answer === answer;
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        createGame: async (
            _: any,
            { input }: { input: GameDataInput },
            context: { isStaff: boolean }
        ) => {
            try {
                // check if user is staff
                if (!context.isStaff) {
                    throw new GraphQLError("Not authenticated!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message: "Staff member not authenticated!",
                                },
                            ],
                        },
                    });
                }

                const exhibit = await ExhibitModel.findById(input.exhibit);
                if (!exhibit)
                    throw new GraphQLError("Exhibit not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "exhibit",
                                    message: "Exhibit not found!",
                                },
                            ],
                        },
                    });

                const game = new GameModel({
                    _id: GenID.game(),
                    name: input.name,
                    subject: input.subject,
                    exhibit: input.exhibit,
                    questions: [],
                });

                exhibit.game = game._id;

                await game.save();
                await exhibit.save();

                return game;
            } catch (err) {
                throw err;
            }
        },
        updateGame: async (
            _: any,
            { id, input }: { id: string; input: Partial<GameDataInput> },
            context: { isStaff: boolean }
        ) => {
            try {
                if (!context.isStaff) {
                    throw new GraphQLError("Not authenticated!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message: "Staff member not authenticated!",
                                },
                            ],
                        },
                    });
                }

                // const game = await GameModel.findOne({ id }); // We need to use findById
                const game = await GameModel.findById(id);

                if (!game) {
                    throw new GraphQLError("Game not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "game",
                                    message: "Game not found!",
                                },
                            ],
                        },
                    });
                }

                if (input.name) game.name = input.name;
                if (input.subject) game.subject = input.subject;
                if (input.exhibit) game.exhibit = input.exhibit;

                await game.save();

                return game;
            } catch (err) {
                throw err;
            }
        },

        deleteGame: async (
            _: any,
            { id }: { id: string },
            context: { isStaff: boolean }
        ) => {
            try {
                if (!context.isStaff) {
                    throw new GraphQLError("Not authenticated!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message: "Staff member not authenticated!",
                                },
                            ],
                        },
                    });
                }

                // const game = await GameModel.findOne({ id }); // We need to use findById
                const game = await GameModel.findById(id);

                if (!game) {
                    throw new GraphQLError("Game not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "game",
                                    message: "Game not found!",
                                },
                            ],
                        },
                    });
                }

                // await GameModel.findByIdAndDelete(id); // We need to use deleteOne, since finding it again is redundant
                await game.deleteOne();

                return game;
            } catch (err) {
                throw err;
            }
        },

        createQuestion: async (
            _: any,
            { input }: { input: QuestionInput },
            context: { isStaff: boolean }
        ) => {
            try {
                if (!context.isStaff) {
                    throw new GraphQLError("Not authenticated!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message: "Staff member not authenticated!",
                                },
                            ],
                        },
                    });
                }

                const game = await GameModel.findById(input.game);
                if (!game)
                    throw new GraphQLError("Game not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "game",
                                    message: "Game not found!",
                                },
                            ],
                        },
                    });

                const triviaQuestion = new TriviaQuestionModel({
                    _id: GenID.triviaQuestion(),
                    question: input.question,
                    choices: input.choices,
                    answer: input.answer,
                    game: input.game,
                });

                game.questions.push(triviaQuestion._id);

                await triviaQuestion.save();
                await game.save();

                return triviaQuestion;
            } catch (err) {
                throw err;
            }
        },

        updateQuestion: async (
            _: any,
            { id, input }: { id: string; input: QuestionInput },
            context: { isStaff: boolean }
        ) => {
            try {
                if (!context.isStaff) {
                    throw new GraphQLError("Not authenticated!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message: "Staff member not authenticated!",
                                },
                            ],
                        },
                    });
                }

                const triviaQuestion = await TriviaQuestionModel.findById(id);

                if (!triviaQuestion) {
                    throw new GraphQLError("Trivia question not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "trivia question",
                                    message: "Trivia question not found!",
                                },
                            ],
                        },
                    });
                }

                if (input.question) triviaQuestion.question = input.question;
                if (input.choices) triviaQuestion.choices = input.choices;
                if (input.answer) triviaQuestion.answer = input.answer;
                if (input.game) triviaQuestion.game = input.game;

                await triviaQuestion.save();

                return triviaQuestion;
            } catch (err) {
                throw err;
            }
        },

        deleteQuestion: async (
            _: any,
            { id }: { id: string },
            context: { isStaff: boolean }
        ) => {
            try {
                if (!context.isStaff) {
                    throw new GraphQLError("Not authenticated!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message: "Staff member not authenticated!",
                                },
                            ],
                        },
                    });
                }

                const triviaQuestion = await TriviaQuestionModel.findById(id);

                if (!triviaQuestion) {
                    throw new GraphQLError("Trivia question not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "trivia question",
                                    message: "Trivia question not found!",
                                },
                            ],
                        },
                    });
                }

                await triviaQuestion.deleteOne();

                return triviaQuestion;
            } catch (err) {
                throw err;
            }
        },
    },
};
