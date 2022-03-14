import { Router } from "express";
import userController from "./../controllers/user.controller";
import { verifyToken } from './../middleware/authJwt';
const userRouter = Router();

userRouter.get('/', [verifyToken], userController.index);

export default userRouter;
