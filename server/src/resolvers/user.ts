import UserModel from "../schemas/User";
import { GraphQLError } from "graphql";
import type { User } from "../util/Types";

type UserInput = {
    grade: string;
    dob: Date;
};

export default {
    Query: {
        getUser: async (_: any, { id }: { id: string }) => {
            // const user = await UserModel.findOne({ id }); // We need to use findById
            const user = await UserModel.findById(id);

            if (!user) {
                throw new GraphQLError("User not found!", {
                    extensions: {
                        errors: [
                            {
                                type: "user",
                                message: "User not found!",
                            },
                        ],
                    },
                });
            }

            return user;
        },

        getUsers: async () => (await UserModel.find()).toSorted(),
    },
    Mutation: {
        createOrUpdateUser: async (
            _: any,
            { input }: { input: UserInput },
            { user }: { user: User }
        ) => {
            try {
                // const userID = context.req?.user?.id; // Cleaner way to get user ID below

                if (!user.id) {
                    throw new GraphQLError("Not authenticated with Google!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message:
                                        "Please authenticate with Google first!",
                                },
                            ],
                        },
                    });
                }

                const userDoc = await UserModel.findById(user.id);

                if (!userDoc) {
                    throw new GraphQLError("User not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "user",
                                    message: "User not found!",
                                },
                            ],
                        },
                    });
                }

                if (input.grade) userDoc.grade = input.grade;
                if (input.dob) userDoc.dob = input.dob;

                await userDoc.save();

                return user;
            } catch (err) {
                throw err;
            }
        },

        awardBadge: async (
            _: any,
            { id }: { id: string },
            { user }: { user: User }
        ) => {
            try {
                // const userID = context.req?.user?.id; // Cleaner way to get user ID below

                if (!user.id) {
                    throw new GraphQLError("Not authenticated with Google!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message:
                                        "Please authenticate with Google first!",
                                },
                            ],
                        },
                    });
                }

                const userDoc = await UserModel.findById(user.id);

                if (!userDoc) {
                    throw new GraphQLError("User not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "user",
                                    message: "User not found!",
                                },
                            ],
                        },
                    });
                }

                if (!userDoc.badges.includes(id)) {
                    userDoc.badges.push(id);
                }

                await userDoc.save();

                return userDoc;
            } catch (err) {
                throw err;
            }
        },

        deleteUser: async (_: any, { id }: { id: string }) => {
            try {
                // const user = await UserModel.findOne({ id }); // We need to use findById
                const user = await UserModel.findById(id);

                if (!user) {
                    throw new GraphQLError("User not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "not_found",
                                    message:
                                        "User not found! Please check the ID.",
                                },
                            ],
                        },
                    });
                }

                // await UserModel.findByIdAndDelete(id); // We need to use deleteOne, since we dont need to find it again
                await user.deleteOne();

                return user;
            } catch (err) {
                throw err;
            }
        },
    },
};
