import { Router } from "express";
import authRouter from "./auth/auth";
import userRouter from "./user/user";
import postRouter from "./post/post";
import followRouter from "./follow/follow";
const v1Router = Router();

v1Router.use('/auth' , authRouter);
v1Router.use('/user' , userRouter);
v1Router.use('/post' , postRouter);
v1Router.use('/follow' , followRouter);


export default v1Router;