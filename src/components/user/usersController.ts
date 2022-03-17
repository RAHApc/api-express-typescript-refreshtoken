import { Request, Response } from "express";

class UserController{
    index = (req: Request, res: Response) => {
        res.send({ message: "user login" });
    }
}

export default UserController;
