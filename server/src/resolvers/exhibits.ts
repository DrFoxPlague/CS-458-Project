import ExhibitModel from "../schemas/Exhibit";
import { GraphQLError } from "graphql";
import GenID from "../util/GenID";

export default {
    Query: {
        getExhibit: async (_: any, { id }: { id: string }) => {
            // const exhibit = await ExhibitModel.findOne({ _id }); // We need to use findById
            const exhibit = await ExhibitModel.findById(id);

            if (!exhibit) {
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
            }

            return exhibit;
        },

        getExhibits: async () => (await ExhibitModel.find()).toSorted(),
    },
    Mutation: {
        createExhibit: async (
            _: any,
            {
                name,
                description,
                image,
            }: {
                name: string;
                description: string;
                image: string;
            },
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

                const exhibit = new ExhibitModel({
                    _id: GenID.exhibit(),
                    name,
                    description,
                    image,
                });

                await exhibit.save();

                return exhibit;
            } catch (err) {
                throw err;
            }
        },

        updateExhibit: async (
            _: any,
            {
                id,
                name,
                description,
                game,
            }: {
                id: string;
                name?: string;
                description?: string;
                game?: string;
                image?: string;
            },
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

                // const exhibit = await ExhibitModel.findOne({ _id }); // We need to use findById
                const exhibit = await ExhibitModel.findById(id);

                if (!exhibit) {
                    throw new GraphQLError("Exhibit not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "not_found",
                                    message:
                                        "Exhibit not found! Please check the ID.",
                                },
                            ],
                        },
                    });
                }

                if (name) exhibit.name = name;
                if (description) exhibit.description = description;
                if (game) exhibit.game = game;

                await exhibit.save();
            } catch (err) {
                throw err;
            }
        },

        deleteExhibit: async (
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

                // const exhibit = await ExhibitModel.findOne({ _id }); // We need to use findById
                const exhibit = await ExhibitModel.findById(id);

                if (!exhibit) {
                    throw new GraphQLError("Exhibit not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "not_found",
                                    message:
                                        "Exhibit not found! Please check the ID.",
                                },
                            ],
                        },
                    });
                }

                // await ExhibitModel.findByIdAndDelete({ _id }); // We need to use deleteOne, since we dont need to find it again
                await exhibit.deleteOne();

                return exhibit;
            } catch (err) {
                throw err;
            }
        },
    },
};
