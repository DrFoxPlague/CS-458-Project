import { model, Schema, type InferSchemaType } from "mongoose";

const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
        default: "N/A"
    },
    dob: {
        type: Date,
        required: true,
        default: new Date('2024-01-15')
    },
    bdg_coll: {
        type: Array,
        required: true,
    },
    is_staff: {
        type: Boolean,
        required: true,
        default: false
    }
})

export type IUser = InferSchemaType<typeof UserSchema>;

const UserModel = model("users", UserSchema);

export type UserDocument = ReturnType<(typeof UserModel)["hydrate"]>;

export default UserModel;