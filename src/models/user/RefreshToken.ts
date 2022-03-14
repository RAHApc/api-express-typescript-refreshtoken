import { Model, Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import config from "./../../../config/default";
import IRefreshToken from './IRefreshToken';

interface IToken extends Model<IRefreshToken> {
    createRefreshToken(userId: string): Promise<string>;
    verifyExpiration(token: IRefreshToken): Promise<boolean>;
}

const refreshToken: Schema = new Schema({
    token: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expiryDate: { type: Date, required: true },
});

refreshToken.statics.createRefreshToken = async function (userId: string): Promise<string> {
    const expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    let _token = uuidv4();
    let _object = new this({
        token: _token,
        user: userId,
        expiryDate: expiredAt.getTime() as unknown as Date,
    })

    let refreshToken = await _object.save();

    return refreshToken.token;
}

refreshToken.statics.verifyExpiration = async function (token: IRefreshToken): Promise<boolean> {
    return token.expiryDate.getTime() < new Date().getTime();
}

const RefreshToken = model<IRefreshToken, IToken>("RefreshToken", refreshToken);
export default RefreshToken;
