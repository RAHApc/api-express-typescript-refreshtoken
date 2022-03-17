import IUser from "../model/IUser";
import UserModel from "../model/User";
import IUserRepository from "./IUserRepository";
import { FilterQuery, UpdateQuery } from 'mongoose';

export default class UserMongoRepository implements IUserRepository {
    public async findOne(ID: string): Promise<IUser | null> {
        return UserModel.findById(ID);
    }

    public async findOneParams(params: any): Promise<IUser | null> {
        return UserModel.findOne(params);
    }

    public async findMany(params: any): Promise<IUser[]> {
        return UserModel.find(params);
    }

    public async create(params: any): Promise<IUser> {
        const newPost = new UserModel({ ...params });
        return newPost.save();
    }

    public updateOne(where: FilterQuery<Partial<IUser>>, updateData: UpdateQuery<Partial<IUser>>): void {
        UserModel.updateOne(where, updateData);
    }

    public deleteOne(ID: string, options: object): void {
        UserModel.findByIdAndRemove(ID, options);
    }
}