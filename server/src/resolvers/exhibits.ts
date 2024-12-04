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
                content,
            }: {
                name: string;
                content: { title?: string; body?: string; media?: any };
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

                if (!content.title && !content.body) {
                    throw new GraphQLError("Exhibit cannot be empty!", {
                        extensions: {
                            errors: [
                                {
                                    type: "content",
                                    message: "Exhibit cannot be empty!",
                                },
                            ],
                        },
                    });
                }

                const { title, body, media } = content;
                let mediaFile = null;

                if (media) {
                    mediaFile = await media;
                }

                const exhibit = new ExhibitModel({
                    _id: GenID.exhibit(),
                    name,
                    content: {
                        title,
                        body,
                        media: mediaFile,
                    },
                    game: null,
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
                content,
            }: {
                id: string;
                name?: string;
                content?: { title?: string; body?: string; media?: any };
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

                if (content) {
                    const { title, body, media } = content;

                    if (title) content.title = title;
                    if (body) content.body = body;
                    if (media) content.media = await media;
                }

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
