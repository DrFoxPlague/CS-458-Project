import { model, Schema, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
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
        email: {
            type: String,
            required: true,
        },
        grade: {
            type: String,
            default: null,
        },
        dob: {
            type: Date,
            default: null,
        },
        badges: {
            type: [String],
            default: [],
        },
        staff: {
            type: Boolean,
            default: false,
        },
        profilePicture: {
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

export type IUser = InferSchemaType<typeof UserSchema>;

const UserModel = model("users", UserSchema);

export type UserDocument = ReturnType<(typeof UserModel)["hydrate"]>;

export default UserModel;
