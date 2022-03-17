import { Router } from "express";
import UserController from "./usersController";
import { verifyToken } from './../../middleware/authJwt';
const userControllerInstance = new UserController();
const userRouter = Router();

userRouter.get('/', [verifyToken], userControllerInstance.index);

export default userRouter;