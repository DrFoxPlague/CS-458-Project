import { gql } from "@apollo/client";

export const CreateGame = gql`
    mutation CreateGame($input: GameDataInput!) {
        createGame(input: $input) {
            id
            name
            subject
            exhibit
            questions {
                id
                question
                choices
            }
        }
    }
`;

export const DeleteGame = gql`
    mutation DeleteGame($id: String!) {
        deleteGame(id: $id) {
            id
            name
            subject
        }
    }
`;

export const UpdateGame = gql`
    mutation UpdateGame($id: String!, $input: GameDataInput!) {
        updateGame(id: $id, input: $input) {
            id
            name
            subject
            questions {
                id
                question
                choices
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

export const CheckQuestion = gql`
    query checkQuestion($id: String!, $answer: String!) {
        checkQuestion(id: $id, answer: $answer)
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
            name
            subject
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
            name
            subject
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
            name
            subject
            questions {
                id
                question
                choices
            }
            exhibit {
                badge {
                    id
                }
            }
        }
    }
`;

export const GetGames = gql`
    query GetGames {
        getGames {
            id
            name
            subject
            questions {
                id
            }
        }
    }
`;
