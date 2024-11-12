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

export const GetUser = gql`
    query GetUser($id: ID!) {
        getUser(id: $id) {
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

export const GetUsers = gql`
    query GetUsers($id: ID!) {
        getUsers {
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