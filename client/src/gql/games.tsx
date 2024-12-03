import { gql } from "@apollo/client";

export const CreateGame = gql`
    mutation CreateGame($input: GameDataInput!) {
        createGame(input: $input) {
            id
            game_name
            game_subject
            questions {
                id
            }
        }
    }
`;

export const DeleteGame = gql`
    mutation DeleteGame($id: String!) {
        deleteGame(id: $id) {
            id
            game_name
            game_subject
        }
    }
`;

export const UpdateGame = gql`
    mutation UpdateGame($id: String!, $input: GameDataInput!) {
        updateGame(id: $id, input: $input) {
            id
            game_name
            game_subject
            questions {
                id
            }
        }
    }
`;

export const CreateTrivQues = gql`
    mutation CreateTrivQues($input: QuestionInput!) {
        createTrivQues(input: $input) {
            id
            question
            choices
            answer
        }
    }
`;

export const DeleteTrivQues = gql`
    mutation DeleteTrivQues($id: String!) {
        deleteTrivQues(id: $id) {
            id
            question
            choices
            answer
        }
    }
`;

export const UpdateTrivQues = gql`
    mutation UpdateTrivQues($id: String!, $input: QuestionInput) {
        updateTrivQues(id: $id, input: $input) {
            id
            question
            choices
            answer
        }
    }
`;

export const AddQuestionToGame = gql`
    mutation AddQuestionToGame($gameId: String!, $question: String!) {
        addQuestion(gameId: $gameId, question: $question) {
            id
            game_name
            game_subject
            questions {
                id
            }
        }
    }
`;

export const RemoveQuestionFromGame = gql`
    mutation RemoveQuestionFromGame($gameId: String!, $question: String!) {
        removeQuestion(gameId: $gameId, question: $question) {
            id
            game_name
            game_subject
            questions {
                id
            }
        }
    }
`;

export const GetGame = gql`
    query GetGame($id: String!) {
        getGame(id: $id) {
            id
            game_name
            game_subject
            questions {
                id
            }
        }
    }
`;

export const GetGames = gql`
    query GetGames {
        getGames {
            id
            game_name
            game_subject
            questions {
                id
            }
        }
    }
`;
