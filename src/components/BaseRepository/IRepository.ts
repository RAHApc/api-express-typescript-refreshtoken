export default interface IRepository<T>{
    findOne(ID: string): Promise<T | null>;
    findMany(params: any): Promise<T[]>;
    create(params: any): Promise<T>;
    updateOne(where: Partial<T>, updateData: Partial<T>): void;
    deleteOne(ID: string,options?:object): void;
}