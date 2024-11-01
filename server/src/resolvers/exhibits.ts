import ExhibitModel from "../schemas/Exhibit";
import { GraphQLError } from "graphql";
import GenID from "../util/GenID";

export default {
    Query: {
        getExhibit: async (_: any, { id }: { id: string }) => {
            const exhibit = await ExhibitModel.findOne({ id });

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
                {title?: string, body?: string, media?: any}}
        ) => {

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

            try {
                if (media) {
                    mediaFile = await media;
                }
            }
            catch(_) {
                throw new GraphQLError("Media load error!", {
                    extensions: {
                        errors: [
                            {
                                type: "media",
                                message: "Media load error!"
                            }
                        ]
                    }
                });
            }

            const exhibit = new ExhibitModel({
                id: GenID.exhibit(),
                ex_name,
                content: {
                    title,
                    body,
                    media: mediaFile
                }
            });

            await exhibit.save();

            return exhibit;
        },
        updateExhibit: async (
            _: any,
            { id, ex_name, content }:
            { id: string, ex_name?: string, content?: 
                {title?: string, body?: string, media?: any}}
        ) => {
            const exhibit = await ExhibitModel.findById(id);

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

            if (ex_name) {
                exhibit.ex_name = ex_name;
            }

            if (content) {
                const { title, body, media } = content;

                if (title) {
                    content.title = title;
                }
                if (body) {
                    content.body = body;
                }
                if (media) {
                    try {
                        content.media = await media;
                    } catch (error) {
                        throw new GraphQLError("Media load error!", {
                            extensions: {
                                errors: [
                                    {
                                        type: "media",
                                        message: "Media load error!"
                                    }
                                ]
                            }
                        });
                    }
                }
            }

            try {
                await exhibit.save();
            } catch (err) {
                throw new GraphQLError("Error saving exhibit! Please try again.", {
                    extensions: {
                        errors: [
                            {
                                type: "database",
                                message: "Error saving exhibit! Please try again."
                            }
                        ]
                    }
                });
        }
        },
        deleteExhibit: async (
            _: any,
            { id }: { id: string }
        ) => {

            const exhibit = await ExhibitModel.findById(id);

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

            try {
                await ExhibitModel.findByIdAndDelete({ id });
            } 
            catch (err) {
                throw new GraphQLError("Error deleting exhibit!", {
                    extensions: {
                        errors: [
                            {
                                type: "database",
                                message: "Error deleting exhibit!"
                            }
                        ]
                    }
                });
        } 
        return exhibit;
    }

       
    }
}