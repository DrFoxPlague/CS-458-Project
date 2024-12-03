import { model, Schema, type InferSchemaType } from "mongoose";

const ExhibitSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        ex_name: {
            type: String,
            required: true,
        },
        content: {
            title: {
                type: String,
                default: null,
            },
            body: {
                type: String,
                default: null,
            },
            image: {
                type: String,
                default: null,
            },
            audio: {
                type: String,
                default: null,
            },
            video: {
                type: String,
                default: null,
            },
        },
        game: {
            type: String,
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

export type IExhibit = InferSchemaType<typeof ExhibitSchema>;

const ExhibitModel = model("exhibits", ExhibitSchema);

export type ExhibitDocument = ReturnType<(typeof ExhibitModel)["hydrate"]>;

export default ExhibitModel;
