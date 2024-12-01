import { model, Schema, type InferSchemaType } from "mongoose";

const GameSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    game_name: {
        type: String,
        required: true
    },
    game_subject: {
        type: String,
        required: true
    },
    questions: {
        type: Array,
        default: null
    }
})

export type IGame = InferSchemaType<typeof GameSchema>;

const GameModel = model("games", GameSchema);

export type GameDocument = ReturnType<(typeof GameModel)["hydrate"]>;

export default GameModel;