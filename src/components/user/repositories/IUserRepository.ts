import IRepository from "./../../BaseRepository/IRepository";
import IUser from "../model/IUser";

export default interface IUserRepository extends IRepository<IUser> {
    findOneParams(params: any): Promise<IUser | null>;
}