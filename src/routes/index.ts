import { Application } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const routers = (app: Application):void =>{
    app.use('/api/v1/auth', authRouter);
    
    app.use('/api/v1/users',userRouter);
}

export default routers;