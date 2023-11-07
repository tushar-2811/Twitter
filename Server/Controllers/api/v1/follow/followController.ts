import { Request , Response } from "express"
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const followController = async(req:Request , res:Response) => {
    try {
        const currId = Number(req.params.currId);
        const userId = Number(req.params.userId);
        const target = req.params.target;

        const currUser = await prisma.user.findUnique({
            where : {
                id : currId
            }
        })

        if(!currUser){
            return res.status(403).json({
                ok : false,
                msg : "error in finding user"
            })
        }

        let updatedFollowingIds = [...(currUser.followingIds) || []];

        if(target == "add"){
           updatedFollowingIds.push(userId);
        }

        if(target == "remove"){
           updatedFollowingIds = updatedFollowingIds.filter((id) => id !== userId);
        }

        const updatedUser = await prisma.user.update({
            where : {
                id : currId
            },
            data : {
                followingIds : updatedFollowingIds
            }
        })

        return res.status(201).json({
            ok : true,
            msg : target === "add" ? "following successful" : "following removed"
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


// check is following
export const checkFollowingController = async(req: Request , res:Response) => {
    try {
        const userId = Number(req.params.userId);
        const currId = Number(req.params.currId);

        const currUser = await prisma.user.findUnique({
            where : {
                id : currId
            }
        })

        let followingIds = currUser?.followingIds;
        let isPresent = followingIds?.filter(id => id === userId);

        return res.status(201).json({
            ok : true,
            isFollowing : isPresent?.length === 0 ? false : true
        })
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok : "false",
            error
        })
    }
}