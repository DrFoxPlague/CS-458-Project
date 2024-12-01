import { model, Schema, type InferSchemaType } from "mongoose";

const TriviaQuestionSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    question: {
        type: String,
        required: true
    },
    choices: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

export type ITriviaQuestion = InferSchemaType<typeof TriviaQuestionSchema>;

const TriviaQuestionModel = model("trivia questions", TriviaQuestionSchema);

export type TriviaQuestionDocument = ReturnType<(typeof TriviaQuestionModel)["hydrate"]>;

export default TriviaQuestionModel;