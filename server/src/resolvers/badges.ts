import BadgeModel from "../schemas/Badge";
import { GraphQLError } from "graphql";
import GenID from "../util/GenID";

export default {
    Query: {
        getBadge: async (_: any, { id }: { id: string }) => {
            const badge = await BadgeModel.findOne({ id });

            if (!badge) {
                throw new GraphQLError("Badge not found!", {
                    extensions: {
                        errors: [
                            {
                                type: "badge",
                                message: "Badge not found!"
                            }
                        ]
                    }
                });
            }

            return badge;
        },

        getBadges: async () => (await BadgeModel.find()).toSorted()
    },
    Mutation: {
        createBadge: async (
            _: any,
            { bdg_name, bdg_type }: { bdg_name: string, bdg_type: string }
        ) => {
            const badge = new BadgeModel({
                id: GenID.badge(),
                bdg_name,
                bdg_type
            });

            await badge.save();

            return badge;
        },

        updateBadge: async () => {},
        deleteBadge: async () => {}
    }
}