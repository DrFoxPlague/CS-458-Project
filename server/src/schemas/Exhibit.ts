import { model, Schema, type InferSchemaType } from "mongoose";

const ExhibitSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    ex_name: {
        type: String,
        required: true
    },
    content: {
        title: {
            type: String,
            default: null
        },
        body: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: null
        },
        audio: {
            type: String,
            default: null
        },
        video: {
            type: String,
            default: null
        }
    },
    game: {
        type: String,
        default: null
    }
})

export type IExhibit = InferSchemaType<typeof ExhibitSchema>;

const ExhibitModel = model("exhibits", ExhibitSchema);

export type ExhibitDocument = ReturnType<(typeof ExhibitModel)["hydrate"]>;

export default ExhibitModel;