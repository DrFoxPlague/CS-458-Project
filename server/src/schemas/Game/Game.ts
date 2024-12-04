import { model, Schema, type InferSchemaType } from "mongoose";

const GameSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        questions: {
            type: Array,
            default: null,
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

export type IGame = InferSchemaType<typeof GameSchema>;

const GameModel = model("games", GameSchema);

export type GameDocument = ReturnType<(typeof GameModel)["hydrate"]>;

export default GameModel;
