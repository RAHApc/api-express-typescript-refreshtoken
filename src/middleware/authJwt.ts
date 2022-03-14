import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "./../../config/default";

const { TokenExpiredError } = jwt;


interface Decoded{
    id: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: "No token Provider!"
        });
    }

    jwt.verify(token as string, config.secret, (err: any, decoded) => {
        if (err) {
            return catchError(err, res);
        }

        req.userId = (decoded as Decoded).id;
        next();
    })
}

const catchError = (err: any, res: Response) => {
    if (err instanceof TokenExpiredError) {
        res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({
        message: "Unauthorized!"
    });
}

