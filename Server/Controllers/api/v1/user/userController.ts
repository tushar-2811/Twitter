import { Request , Response } from "express"
import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient();

// To get max-10 registered users
export const getAllUsersController = async(req:Request , res:Response) => {
    try {
        const Users = await prisma.user.findMany({
            take : 10
        });

        return res.status(201).json({
            ok : true,
            msg : "registered users",
            users : Users
        })
 
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok : false,
            msg : "failed to fetch users",
            error : error
        })
    }
}


// To get single User
export const getSingleUserController = async(req:Request , res:Response) => {
    try {
        const userId = Number(req.params.id);

        const singleUser = await prisma.user.findUnique({
            where : {
                id : userId
            }
        })
       
        return res.status(201).json({
            ok : true,
            msg : "user found",
            user : singleUser
        })
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok : false,
            msg : "error in fetching user",
            error : error
        })
    }
}