import { Router } from "express";
import { getAllUsersController, getSingleUserController } from "../../../../Controllers/api/v1/user/userController";
const userRouter = Router();

// To get 10 registered users
userRouter.get('/get-10' , getAllUsersController);

// To fetch single User
userRouter.get('/:id' , getSingleUserController);



export default userRouter;