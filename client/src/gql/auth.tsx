import { gql } from "@apollo/client";

export const GenerateGoogleUrl = gql`
    mutation generateGoogleAuthURL {
        generateGoogleAuthURL
    }
`;

export const LoginUser = gql`
    mutation login($code: String!) {
        login(code: $code) {
            token
            id
            name
            email
            grade
            dob
            bdg_coll {
                id
                bdg_name
                bdg_type
            }
            is_staff
            prof_pic
        }
    }
`;
