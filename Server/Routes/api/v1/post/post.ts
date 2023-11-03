import { Router } from "express";
import { creatPostController, getAllPostController, getAllPostHomeController } from "../../../../Controllers/api/v1/post/postController";

const postRouter = Router();

// create-post
postRouter.post('/:userId/create-post' , creatPostController);


// get-all-posts : for Home Page
postRouter.get('/all-posts' , getAllPostHomeController);

// get-all-post : for particular user
postRouter.get('/:userId' , getAllPostController);



export default postRouter;