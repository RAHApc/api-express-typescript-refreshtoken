import { Document } from 'mongoose';
// import IRefreshToken from './IRefreshToken';

export default interface IRefreshToken extends Document {
    token: string;
    user: string;
    expiryDate: Date;
}

