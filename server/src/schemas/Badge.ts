import { model, Schema, type InferSchemaType } from "mongoose";

const BadgeSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
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