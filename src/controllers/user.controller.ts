import { Request, Response } from "express";

export const index = (req:Request,res:Response) => {
    res.send({ message: "user login" });
}


export default {
    index
}