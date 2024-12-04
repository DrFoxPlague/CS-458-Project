import { model, Schema, type InferSchemaType } from "mongoose";

const ExhibitSchema = new Schema(
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
        description: {
            type: String,
            required: true,
        },
        game: {
            type: String,
            default: null,
        },
        image: {
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

export type IExhibit = InferSchemaType<typeof ExhibitSchema>;

const ExhibitModel = model("exhibits", ExhibitSchema);

export type ExhibitDocument = ReturnType<(typeof ExhibitModel)["hydrate"]>;

export default ExhibitModel;
