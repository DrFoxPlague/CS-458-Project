import { gql } from "@apollo/client";

export const CreateOrUpdateUser = gql`
    mutation CreateorUpdateUser($input: UserInput!) {
        createOrUpdateUser(input: $input) {
            grade
            dob
        }
    }
`;

export const DeleteUser = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
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
            prof_pic
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
            prof_pic
        }
    }
`;