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
            followers : followersCount
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


// check is LIked

export const isLikedController = async(req:Request , res:Response) => {
    try {
        const userId = Number(req.params.userId) ;
        const postId = Number(req.params.postId) ;

        const post = await prisma.post.findUnique({
            where : {
                id : postId
            }
        })

        const isPresent = post?.likedIds.find((likedUserId) => {
            return likedUserId === userId;
        })


        if(!isPresent) {
            return res.status(201).json({
                ok : true,
                isLiked : false
            })
        }

        return res.status(201).json({
            ok : true,
            isLiked : true
        })
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok : false,
            error
        })
    }
}



// update-like
export const updateLikeController = async(req:Request , res:Response) => {
    try {
        const userId = Number(req.params.userId);
        const postId = Number(req.params.postId);
        const status = Number(req.params.status);

        const post = await prisma.post.findUnique({
            where : {
                id : postId
            }
        });

        if(status === 0){
           
            const newIds = post?.likedIds.filter(id => id !== userId);
            const updatedPost = await prisma.post.update({
                where : {
                    id : postId
                },
                data : {
                    likedIds : newIds
                }
            })

            return res.status(201).json({
                ok : true,
                msg : "removed Like"
            })

        }else{
          post?.likedIds.push(userId);
          const updatedPost = await prisma.post.update({
            where : {
                id : postId
            },
            data : {
                likedIds : post?.likedIds
            }
        })

        return res.status(201).json({
            ok : true,
            msg : "added like"
        })        

        }
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok : false,
            error
        })
    }
}