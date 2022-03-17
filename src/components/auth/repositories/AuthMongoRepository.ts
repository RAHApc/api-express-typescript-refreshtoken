import IRefreshToken from "../model/IRefreshToken";
import RefreshToken from "../model/RefreshToken";
import IAuthRepository from "./IAuthRepository";
import { FilterQuery } from 'mongoose';
import { UpdateQuery } from 'mongoose';

export default class AuthMongoRepository implements IAuthRepository {

    public async findOne(ID: string): Promise<IRefreshToken | null> {
        return RefreshToken.findById(ID);
    }

    public async findOneParams(params: any): Promise<IRefreshToken | null> {
        return RefreshToken.findOne(params);
    }

    public async findMany(params: any): Promise<IRefreshToken[]> {
        return RefreshToken.find(params);
    }

    public async create(params: any): Promise<IRefreshToken> {
        const newPost = new RefreshToken({ ...params });
        return newPost.save();
    }

    public updateOne(where: FilterQuery<Partial<IRefreshToken>>, updateData: UpdateQuery<Partial<IRefreshToken>>): void {
        RefreshToken.updateOne(where, updateData);
    }

    public deleteOne(ID: string, options: object): void {
        RefreshToken.findByIdAndRemove(ID, options);
    }
}