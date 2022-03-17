import IRepository from "../../BaseRepository/IRepository";
import IRefreshToken from "../model/IRefreshToken";

export default interface IAuthRepository extends IRepository<IRefreshToken>{
    findOneParams(params: any): Promise<IRefreshToken | null>;
}