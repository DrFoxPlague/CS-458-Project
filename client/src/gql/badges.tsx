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
    mutation DeleteBadge($id: String!) {
        deleteBadge(id: $id) {
            id
            bdg_name
            bdg_type
        }
    }
`;

export const UpdateBadge = gql`
    mutation UpdateBadge($id: String!, $bdg_name: String, $bdg_type: String) {
        updateBadge(id: $id, bdg_name: $bdg_name, bdg_type: $bdg_type) {
            id
            bdg_name
            bdg_type
        }
    }
`;

export const GetBadge = gql`
    query GetBadge($id: String!) {
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
