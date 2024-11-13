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
            { bdg_name, bdg_type }: { bdg_name: string, bdg_type: string },
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

                const badge = new BadgeModel({
                    id: GenID.badge(),
                    bdg_name,
                    bdg_type
                });
                    
                await badge.save();
                
                return badge;

            } catch (err) {
                throw err;
            }
        },

        updateBadge: async (
            _: any,
            { id, bdg_name, bdg_type }: 
            { id: string, bdg_name?: string, bdg_type?: string },
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

                if (bdg_name) badge.bdg_name = bdg_name;
                if (bdg_type) badge.bdg_type = bdg_type;

                await badge.save();

                return badge;

            } catch (err) {
                throw err;
            }
        },

        deleteBadge: async (
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
                                    message: "Staff member not authenticated!"
                                }
                            ]
                        }
                    });
                }

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

                await BadgeModel.findByIdAndDelete(id);

                return badge;

            } catch (err) {
                throw err;
            }
        }
    }
}