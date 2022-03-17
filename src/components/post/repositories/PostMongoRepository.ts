import { FilterQuery, UpdateQuery } from "mongoose";
import IPost from "../model/IPost";
import PostModel from "../model/Post";
import IPostRepository from "./IPostRepository";

export default class PostMongoRepository implements IPostRepository {
    public async findOne(ID: string): Promise<IPost | null> {
        return PostModel.findById(ID);
    }

    public async findMany(params: any): Promise<IPost[]> {
        return PostModel.find(params);
    }

    public async create(params: any): Promise<IPost> {
        const newPost = new PostModel({ ...params });
        return newPost.save();
    }

    public updateOne(where: FilterQuery<Partial<IPost>>, updateData: UpdateQuery<Partial<IPost>>): void {
        PostModel.updateOne(where, updateData);
    }

    public deleteOne(ID: string): void { }
}