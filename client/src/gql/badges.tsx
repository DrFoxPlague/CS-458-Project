import { gql } from "@apollo/client";

export const CreateBadge = gql`
    mutation CreateBadge($name: String!, $type: String!) {
        createBadge(name: $name, type: $type) {
            id
            name
            description
            type
        }
    }
`;

export const DeleteBadge = gql`
    mutation DeleteBadge($id: String!) {
        deleteBadge(id: $id) {
            id
            name
            description
            type
        }
    }
`;

export const UpdateBadge = gql`
    mutation UpdateBadge($id: String!, $name: String, $type: String) {
        updateBadge(id: $id, name: $name, type: $type) {
            id
            name
            description
            type
            }
    }
`;

export const GetBadge = gql`
    query GetBadge($id: String!) {
        getBadge(id: $id) {
            id
            name
            description
            type
        }
    }
`;

export const GetBadges = gql`
    query GetBadges {
        getBadges {
            id
            name
            description
            type
        }
    }
`;
