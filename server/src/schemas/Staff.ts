import { model, Schema, type InferSchemaType } from "mongoose";

const StaffSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_num: {
        type: String,
        required: true,
    }
})

export type IStaff = InferSchemaType<typeof StaffSchema>;

const StaffModel = model("staff", StaffSchema);

export type StaffDocument = ReturnType<(typeof StaffModel)["hydrate"]>;

export default StaffModel;