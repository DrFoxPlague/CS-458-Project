import UserModel from "../schemas/User";
import { GraphQLError } from "graphql";

type UserInput = {
    grade: string;
    dob: Date;
}

export default {
    Query: {
        getUser: async (_: any, { id }: { id: string }) => {
            const user = await UserModel.findOne({ id });

            if (!user) {
                throw new GraphQLError("User not found!", {
                    extensions: {
                        errors: [
                            {
                                type: "user",
                                message: "User not found!"
                            }
                        ]
                    }
                });
            }

            return user;
        },

        getUsers: async () => (await UserModel.find()).toSorted()
    },
    Mutation: {
        createUser: async (
            _: any,
            { id, input }: { id: string, input: UserInput },
            context: { auth: boolean }
        ) => {
            try {
                if(!context.auth) {
                    throw new GraphQLError("Not authenticated with Google!", {
                        extensions: {
                            errors: [
                                {
                                    type: "authentication",
                                    message: "Please authenticate with Google first!"
                                }
                            ]
                        }
                    });
                }

                const user = await UserModel.findById(id);

                if (!user) {
                    throw new GraphQLError("User not found!", {
                        extensions: {
                            errors: [
                                {
                                    type: "user",
                                    message: "User not found!"
                                }
                            ]
                        }
                    });
                }

                if (input.grade) user.grade = input.grade;
                if (input.dob) user.dob = input.dob;

                await user.save()

                return user;

            } catch (err) {
                throw err;
            }
        },

        updateUser: async () => {},

        deleteUser: async () => {}
    }
}