import { model, Schema, type InferSchemaType } from "mongoose";

const BadgeSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    bdg_name: {
        type: String,
        required: true
    },
    bdg_type: {
        type: String,
        required: true
    },
})

export type IBadge = InferSchemaType<typeof BadgeSchema>;

const BadgeModel = model("badges", BadgeSchema);

export type BadgeDocument = ReturnType<(typeof BadgeModel)["hydrate"]>;

export default BadgeModel;