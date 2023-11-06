import { Router } from "express";
import { getAllUsersController, getSingleUserController, isLikedController, updateLikeController, updateUserController } from "../../../../Controllers/api/v1/user/userController";
import { isAuthenticated } from "../../../../Middlewares/authMiddleware";
const userRouter = Router();

// To get 10 registered users
userRouter.get('/get-10' , getAllUsersController);

// To update particular User
userRouter.post('/:id/update-user' , updateUserController);

// To fetch single User
userRouter.get('/:id',getSingleUserController);



// to check that if this particular user has liked this post or Not;
userRouter.get("/:userId/:postId/check" , isLikedController);


// update like
userRouter.post("/:userId/:postId/:status" , updateLikeController); 



export default userRouter;