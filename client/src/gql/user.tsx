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
            is_staff
        }
    }
`;

export const DeleteUser = gql`
    mutation DeleteUser($id: ID!) {
        createUser(id: $id) {
            id
            name
            email
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
            is_staff
        }
    }
`;

export const GetUsers = gql`
    query GetUsers {
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
            is_staff
        }
    }
`;