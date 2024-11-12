import { gql } from "@apollo/client";

export const CreateOrUpdateUser = gql`
    mutation CreateUser($id: ID!, $input: UserInput!) {
        createUser(id: $id, input: $input) {
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
        }
    }
`;

