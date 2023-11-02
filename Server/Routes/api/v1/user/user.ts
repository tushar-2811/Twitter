import { Router } from "express";
import { getAllUsersController, getSingleUserController, updateUserController } from "../../../../Controllers/api/v1/user/userController";
import { isAuthenticated } from "../../../../Middlewares/authMiddleware";
const userRouter = Router();

// To get 10 registered users
userRouter.get('/get-10' , getAllUsersController);

// To fetch single User
userRouter.get('/:id',getSingleUserController);

// To update particular User
userRouter.post('/:id/update-user' , updateUserController);



export default userRouter;