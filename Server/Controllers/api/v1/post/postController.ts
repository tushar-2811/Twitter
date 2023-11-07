import { Request , Response } from "express"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// to create Post
export const creatPostController = async(req:Request , res:Response) => {
    try {
        const userId = Number(req.params.userId);
        const {body } = req.body;

        const newPost = await prisma.post.create({
           data : {
            body,
            userId
           }
        })
        
        const Posts = await prisma.post.findMany({
            include : {
                user : true,
                comments : true
            },
            orderBy : {
                id : "desc"
            }
        })
        return res.status(201).json({
            ok : "true",
            msg : "New Post Published",
            post : Posts
        })

        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok : 'false',
            msg : "error in creating post",
            error
        })
    }
}


// to get posts for particular user
export const getAllPostController = async(req:Request , res:Response) => {
    try {
        const userId = Number(req.params.userId);

        const userPosts = await prisma.post.findMany({
            where : {
                userId : userId
            },
            include : {
                user : true,
                comments : true
            },
            orderBy : {
                id : 'desc'
            }
        })

        return res.status(201).json({
            ok : true,
            posts : userPosts
        })
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok : false,
            msg : "error in getting posts",
            error
        })
    }
}


// get all posts for home page
export const getAllPostHomeController = async(req:Request , res:Response) => {
    try {

        const allPosts = await prisma.post.findMany({
            include : {
                user : true,
                comments : true
            },
            orderBy : {
                id : 'desc'
            }
        })

        return res.status(201).json({
            ok : true,
            posts : allPosts
        })
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok : false,
            msg : "error in fetching posts"
        })
    }
}