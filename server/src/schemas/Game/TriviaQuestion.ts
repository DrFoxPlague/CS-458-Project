import { model, Schema, type InferSchemaType } from "mongoose";

const TriviaQuestionSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        question: {
            type: String,
            required: true,
        },
        choices: {
            type: [String],
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
    },
    {
        virtuals: {
            id: {
                get: function () {
                    return this._id;
                },
                set: function (v: string) {
                    this._id = v;
                },
            },
        },
        toJSON: {
            virtuals: true,
            transform: function (_, ret) {
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: function (_, ret) {
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

export type ITriviaQuestion = InferSchemaType<typeof TriviaQuestionSchema>;

const TriviaQuestionModel = model("trivia_questions", TriviaQuestionSchema);

export type TriviaQuestionDocument = ReturnType<
    (typeof TriviaQuestionModel)["hydrate"]
>;

export default TriviaQuestionModel;
