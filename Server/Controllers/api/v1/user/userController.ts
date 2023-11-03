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
        if(!userId) {
            return res.end();
        }

        const singleUser = await prisma.user.findUnique({
            where : {
                id : userId
            }
        })

        const followersCount = await prisma.user.count({
            where : {
                followingIds : {
                    has : userId
                }
            }
        })
       
        return res.status(201).json({
            ok : true,
            msg : "user found",
            user : singleUser,
            follwers : followersCount
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


// To update a single user
export const updateUserController = async(req : Request , res: Response) => {
    try {
        const userId = Number(req.params.id);
        const {name , username , bio , profileImage , coverImage} = req.body;

        const updatedUser = await prisma.user.update({
            where : {
                id : userId
            },
            data : {
                name , username , bio , profileImage , coverImage
            }
        })

        return res.status(201).json({
            ok : true,
            msg : "Updated Successfully",
            user : updatedUser
        })
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok : false,
            msg : "something went wrong",
            error
        })
    }
} 