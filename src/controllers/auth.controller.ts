import { Request, Response } from "express"
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import config from "./../../config/default";
import UserModel from "../models/user/User";
import RefreshToken from "../models/user/RefreshToken";

export const signUp = async (req: Request, res: Response) => {
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    try {
        await newUser.save();
        res.status(201).send({ message: "User was registered successfully!" });
    } catch (error: any) {
        res.status(500).send({ message: error })
    }
}

export const signIn = async (req: Request, res: Response) => {

    try {
        const user = await UserModel.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({
            id: user._id
        },
            config.secret, {
            expiresIn: config.jwtExpiration
        });

        let refreshToken = await RefreshToken.createRefreshToken(user._id);

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            refreshToken: refreshToken,
        });

    } catch (error) {
        res.status(500).send({ message: error })
    }
}

export const newRefreshToken = async (req: Request, res: Response) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken === null) {
        return res.status(403).send({ message: "Refresh Token is required!" })
    }

    try {
        let refreshtoken = await RefreshToken.findOne({ token: requestToken });
        if (!refreshtoken) {
            return res.status(403).send({ message: "Refresh token is not in database!" })
        }

        const isVerifyExpiration = await RefreshToken.verifyExpiration(refreshtoken);
        if (isVerifyExpiration) {
            RefreshToken.findByIdAndRemove(refreshtoken._id, {
                useFindAndModify: false
            }).exec();

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        let newAccessToken = jwt.sign({ id: refreshtoken.user }, config.secret, { expiresIn: config.jwtExpiration });

        return res.status(200).send({
            accessToken: newAccessToken,
            refreshToken: refreshtoken.token
        });

    } catch (error) {
        res.status(500).send({ message: error })
    }
}