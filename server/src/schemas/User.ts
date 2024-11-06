import { model, Schema, type InferSchemaType } from "mongoose";

const UserSchema = new Schema({
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
    grade: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    bdg_coll: {
        type: Array,
        required: true,
    }
})

export type IUser = InferSchemaType<typeof UserSchema>;

const UserModel = model("users", UserSchema);

export type UserDocument = ReturnType<(typeof UserModel)["hydrate"]>;

export default UserModel;