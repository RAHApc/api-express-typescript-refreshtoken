import { Application } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import postRouter from "./../components/post/postsRouter";

const routers = (app: Application): void => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/posts', postRouter);
}

export default routers;