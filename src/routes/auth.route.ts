import { Router } from "express";
import { signIn, signUp, newRefreshToken } from "./../controllers/auth.controller";
const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/refreshtoken', newRefreshToken);

export default authRouter;