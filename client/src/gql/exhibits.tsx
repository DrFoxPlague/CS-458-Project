import { gql } from "@apollo/client";

export const CreateExhibit = gql`
    mutation CreateExhibit($name: String!, $content: ExhibitContentInput!) {
        createExhibit(name: $name, content: $content) {
            id
            name
            description
            game
            image
        }
    }
`;

export const UpdateExhibit = gql`
    mutation UpdateExhibit(
        $id: String!
        $name: String
        $content: ExhibitContentInput
    ) {
        updateExhibit(id: $id, name: $name, content: $content) {
            id
            name
            description
            game
            image
        }
    }
`;

export const DeleteExhibit = gql`
    mutation DeleteExhibit($id: String!) {
        deleteExhibit(id: $id) {
            id
            name
            description
            game
            image
        }
    }
`;

export const GetExhibit = gql`
    query GetExhibit($id: String!) {
        getExhibit(id: $id) {
            id
            name
            description
            game {
                id
            }
            image
            badge {
                id
            }
        }
    }
`;

export const GetExhibits = gql`
    query GetExhibits {
        getExhibits {
            id
            name
            description
            game
        }
    }
`;
