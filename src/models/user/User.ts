import { Schema, model } from "mongoose";
import IUser from "./IUser";

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

const UserModel = model<IUser>("User", userSchema);
export default UserModel;