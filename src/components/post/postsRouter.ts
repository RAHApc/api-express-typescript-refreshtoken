import { Router } from "express";
import PostController from "./postsController";

const postControllerInstance = new PostController();
const postRouter: Router = Router();

postRouter.get('/', postControllerInstance.index);
postRouter.post('/', postControllerInstance.create);

export default postRouter;