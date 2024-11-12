import { gql } from "@apollo/client";

export const CreateBadge = gql`
    mutation CreateBadge($bdg_name: String!, $bdg_type: String!) {
        createBadge(bdg_name: $bdg_name, bdg_type: $bdg_type) {
            id
            bdg_name
            bdg_type
        }
    }
`;

export const DeleteBadge = gql`
    mutation DeleteBadge($id: ID!) {
        deleteBadge(id: $id) {
            id
            bdg_name
            bdg_type
        }
    }
`;

export const UpdateBadge = gql`
    mutation UpdateBadge($id: ID!, $bdg_name: String, $bdg_type: String) {
        updateBadge(id: $id, bdg_name: $bdg_name, bdg_type: $bdg_type) {
            id
            bdg_name
            bdg_type
        }
    }
`;

export const GetBadge = gql`
    query GetBadge($id: ID!) {
        getBadge(id: $id) {
            id
            bdg_name
            bdg_type
        }
    }
`;

export const GetBadges = gql`
    query GetBadges {
        getBadges {
            id
            bdg_name
            bdg_type
        }
    }
`;
