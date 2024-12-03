import { gql } from "@apollo/client";

export const CreateExhibit = gql`
    mutation CreateExhibit($ex_name: String!, $content: ExhibitContentInput!) {
        createExhibit(ex_name: $ex_name, content: $content) {
            id
            ex_name
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
        $ex_name: String
        $content: ExhibitContentInput
    ) {
        updateExhibit(id: $id, ex_name: $ex_name, content: $content) {
            id
            ex_name
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
            ex_name
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
            ex_name
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
            ex_name
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
