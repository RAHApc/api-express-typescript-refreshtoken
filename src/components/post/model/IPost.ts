import { Document } from "mongoose";
import ILikePost from "./ILikePost";

export default interface IPost extends Document{
    user: string;
    desc: string;
    image?: string;
    likes?: ILikePost[];
}