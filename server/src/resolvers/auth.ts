import { authUser, generateGoogleUrl } from "../util/Auth";

export default {
    Mutation: {
        generateGoogleAuthURL: async () => generateGoogleUrl(),
        login: async (_: any, { code }: { code: string }) => authUser(code),
    },
};
