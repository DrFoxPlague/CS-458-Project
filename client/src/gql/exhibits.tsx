import { gql } from "@apollo/client";

export const CreateExhibit = gql`
    mutation CreateExhibit($name: String!, $content: ExhibitContentInput!) {
        createExhibit(name: $name, content: $content) {
            id
            name
            content {
                title
                body
                image
                audio
                video
            }
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
            content {
                title
                body
                image
                audio
                video
            }
        }
    }
`;

export const DeleteExhibit = gql`
    mutation DeleteExhibit($id: String!) {
        deleteExhibit(id: $id) {
            id
            name
            content {
                title
                body
                image
                audio
                video
            }
        }
    }
`;

export const GetExhibit = gql`
    query GetExhibit($id: String!) {
        getExhibit(id: $id) {
            id
            name
            content {
                title
                body
                image
                audio
                video
            }
        }
    }
`;

export const GetExhibits = gql`
    query GetExhibits {
        getExhibits {
            id
            name
            content {
                title
                body
                image
                audio
                video
            }
        }
    }
`;
