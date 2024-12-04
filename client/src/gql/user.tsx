import { gql } from "@apollo/client";

export const CreateOrUpdateUser = gql`
    mutation CreateorUpdateUser($input: UserInput!) {
        createOrUpdateUser(input: $input) {
            dob
            grade
        }
    }
`;

export const DeleteUser = gql`
    mutation DeleteUser($id: String!) {
        deleteUser(id: $id) {
            id
            name
            email
        }
    }
`;

export const GetUser = gql`
    query GetUser($id: String!) {
        getUser(id: $id) {
            id
            name
            email
            grade
            dob
            badges {
                id
                name
                description
                type
            }
            staff
            profilePicture
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
            badges {
                id
                name
                description
                type
            }
            staff
            profilePicture
        }
    }
`;