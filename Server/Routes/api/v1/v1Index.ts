import { Router } from "express";
import authRouter from "./auth/auth";
import userRouter from "./user/user";
import postRouter from "./post/post";
const v1Router = Router();

v1Router.use('/auth' , authRouter);
v1Router.use('/user' , userRouter);
v1Router.use('/post' , postRouter);


export default v1Router;