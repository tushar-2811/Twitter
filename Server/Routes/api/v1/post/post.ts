import { Router } from "express";
import { creatPostController, getAllPostController } from "../../../../Controllers/api/v1/post/postController";

const postRouter = Router();

// create-post
postRouter.post('/create-post' , creatPostController);

// get-all-post
postRouter.get('/:id/get-post' , getAllPostController);


export default postRouter;