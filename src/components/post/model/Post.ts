import { Schema, model } from "mongoose";
import IPost from './IPost';

const postSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    desc: { type: String, required: true },
    image: { type: String },
    likes: { type: [String] }
});

const PostModel = model<IPost>("Post", postSchema);
export default PostModel;