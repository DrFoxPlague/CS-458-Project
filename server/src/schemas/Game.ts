import { model, Schema, type InferSchemaType } from "mongoose";

const GameSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    game_name: {
        type: String,
        required: true
    },
    game_type: {
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