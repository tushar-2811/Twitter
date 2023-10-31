import { Router } from "express";
import { userLoginController, userRegisterController } from "../../../../Controllers/api/v1/auth/authController";
const authRouter = Router();

// To Register New User
authRouter.post('/register' , userRegisterController);

// To Login into already existing Account
authRouter.post('/login' , userLoginController);


export default authRouter;