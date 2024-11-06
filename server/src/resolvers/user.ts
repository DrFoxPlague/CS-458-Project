import UserModel from "../schemas/User";
import { GraphQLError } from "graphql";

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
            // other args here
        ) => {
            try {
                const user = new UserModel({
                    id,
                    name,
                    email,
                    address,
                    grade,
                    dob,
                    bdg_coll: []
                });

                await user.save();

                return user;

            } catch (err) {
                throw err;
            }
        },

        updateUser: async () => {},

        deleteUser: async () => {}
    }
}