import ExhibitModel from "../schemas/Exhibit";
import { GraphQLError } from "graphql";

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
        }
    }
};