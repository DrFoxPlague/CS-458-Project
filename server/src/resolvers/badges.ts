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

            try{
                await badge.save();
            }
            catch (err) {
                throw new GraphQLError("Error saving badge! Please try again.", {
                    extensions: {
                        errors: [
                            {
                                type: "database",
                                message: "Error saving badge! Please try again."
                            }
                        ]
                    }
                });
            }
            

            return badge;
        },

        updateBadge: async (
            _: any,
            { id, bdg_name, bdg_type }: 
            { id: string, bdg_name?: string, bdg_type?: string }
        ) => {
            const badge = await BadgeModel.findById(id);

            if (!badge) {
                throw new GraphQLError("Badge not found!", {
                    extensions: {
                        errors: [
                            {
                                type: "not_found",
                                message: "Badge not found! Please check the ID."
                            }
                        ]
                    }
                });
            }

            if (bdg_name) {
                badge.bdg_name = bdg_name;
            }
            if (bdg_type) {
                badge.bdg_type = bdg_type;
            }

            try{
                await badge.save();
            }
            catch (err) {
                throw new GraphQLError("Error saving badge! Please try again.", {
                    extensions: {
                        errors: [
                            {
                                type: "database",
                                message: "Error saving badge! Please try again."
                            }
                        ]
                    }
                });
            }

            return badge;
        },

        deleteBadge: async (
            _: any,
            { id }: { id: string }
        ) => {
            const badge = await BadgeModel.findById(id);

            if (!badge) {
                throw new GraphQLError("Badge not found!", {
                    extensions: {
                        errors: [
                            {
                                type: "not_found",
                                message: "Badge not found! Please check the ID."
                            }
                        ]
                    }
                });
            }

            try {
                await BadgeModel.findByIdAndDelete(id);
            } catch(err) {
                throw new GraphQLError("Error deleting badge!", {
                    extensions: {
                        errors: [
                            {
                                type: "database",
                                message: "Error deleting badge!"
                            }
                        ]
                    }
                });
            }

            return badge;
        }
    }
}