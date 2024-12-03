import { model, Schema, type InferSchemaType } from "mongoose";

const BadgeSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        bdg_name: {
            type: String,
            required: true,
        },
        bdg_desc: {
            type: String,
            required: true,
        },
        bdg_img: {
            type: String,
            required: true,
        },
        bdg_type: {
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

export type IBadge = InferSchemaType<typeof BadgeSchema>;

const BadgeModel = model("badges", BadgeSchema);

export type BadgeDocument = ReturnType<(typeof BadgeModel)["hydrate"]>;

export default BadgeModel;
