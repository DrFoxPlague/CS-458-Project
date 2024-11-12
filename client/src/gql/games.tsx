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
    mutation DeleteGame($id: ID!) {
        deleteGame(id: $id) {
            id
            game_name
            game_subject
        }
    }
`;

export const UpdateGame = gql`
    mutation UpdateGame($id: ID!, $input: GameDataInput!) {
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
    mutation DeleteTrivQues($id: ID!) {
        deleteTrivQues(id: $id) {
            id
            question
            choices
            answer
        }
    }
`;

export const UpdateTrivQues = gql`
    mutation UpdateTrivQues($id: ID!, $input: QuestionInput) {
        updateTrivQues(id: $id, input: $input) {
            id
            question
            choices
            answer
        }
    }
`;

export const AddQuestionToGame = gql`
    mutation AddQuestionToGame($gameId: ID!, $question: ID!) {
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
    mutation RemoveQuestionFromGame($gameId: ID!, $question: ID!) {
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
    query GetGame($id: ID!) {
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
