import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    userName: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
}, {timestamps: true});

export default mongoose.model<IUser>("User", UserSchema);