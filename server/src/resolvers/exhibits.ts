import ExhibitModel from "../schemas/Exhibit";
import { GraphQLError } from "graphql";
import GenID from "../util/GenID";

export default {
    Query: {
        getExhibit: async (_: any, { _id }: { _id: string }) => {
            const exhibit = await ExhibitModel.findOne({ _id });

            if (!exhibit) {
                throw new GraphQLError("Exhibit not found!", {
                    extensions: {
                        errors: [
                            {
                                type: "exhibit",
                                message: "Exhibit not found!"
                            }
                        ]
                    }
                });
            }

            return exhibit;
        },

        getExhibits: async () => (await ExhibitModel.find()).toSorted()
    },
    Mutation: {
        createExhibit: async (
            _: any, 
            {ex_name, content}: {ex_name: string, content: 
                {title?: string, body?: string, media?: any}},
            context: { isStaff: boolean }
        ) => {
            try {
                if (!context.isStaff) {
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

                if (!content.title && !content.body) {
                    throw new GraphQLError("Exhibit cannot be empty!", {
                        extensions: {
                            errors: [
                                {
                                    type: "content",
                                    message: "Exhibit cannot be empty!"
                                }
                            ]
                        }
                    });
                }

                const { title, body, media } = content;
                let mediaFile = null;

                if (media) {
                    mediaFile = await media;
                }

                const exhibit = new ExhibitModel({
                    _id: GenID.exhibit(),
                    ex_name,
                    content: {
                        title,
                        body,
                        media: mediaFile
                    },
                    game: null
                });

                await exhibit.save();

                return exhibit;

            } catch (err) {
                throw err;
            }
        },
        
        updateExhibit: async (
            _: any,
            { _id, ex_name, content }:
            { _id: string, ex_name?: string, content?: 
                {title?: string, body?: string, media?: any}},
            context: { isStaff: boolean }    
        ) => {
            try {
                if (!context.isStaff) {
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

                const exhibit = await ExhibitModel.findOne({ _id });

                if (!exhibit) {
                    throw new GraphQLError("Exhibit not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "not_found",
                                    message: "Exhibit not found! Please check the ID."
                                }
                            ]
                        }
                    });
                }

                if (ex_name) exhibit.ex_name = ex_name;

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
            { _id }: { _id: string },
            context: { isStaff: boolean }
        ) => {
            try {
                if (!context.isStaff) {
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

                const exhibit = await ExhibitModel.findOne({ _id });

                if (!exhibit) {
                    throw new GraphQLError("Exhibit not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "not_found",
                                    message: "Exhibit not found! Please check the ID."
                                }
                            ]
                        }
                    });
                }

                await ExhibitModel.findByIdAndDelete({ _id });

                return exhibit;

            } catch (err) {
                throw err;
            }
        }
    }
}