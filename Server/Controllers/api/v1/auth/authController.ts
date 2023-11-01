import { Request , Response } from "express"
import { userSchemaForRegister , userSchemaForLogin } from "../../../../zod/userSchema";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import envConfig from "../../../../config/envConfig";

const prisma = new PrismaClient();

// To Register a New User --- Create New Account
export const userRegisterController = async(req:Request , res:Response) => {
    try {
      const {name , username , email , password} = req.body;
      const parsedInput = userSchemaForRegister.safeParse({
        name , username , email , password
      });

      if(!parsedInput.success) {
         return res.status(401).json({
            ok : false,
            msg : "Please Provide valid credentials",
            error : parsedInput.error
         })
      }
      
      // Check if there exist any user by this username or email
      const existingUserByEmail = await prisma.user.findUnique({
        where : {
            email : email,    
        }
      })

      if(existingUserByEmail){
         return res.status(401).json({
            ok : false,
            msg : "user already exist with this email"
         })
      }

      const exisingUserByUsername = await prisma.user.findUnique({
        where : {
            username : username
        }
      })

      if(exisingUserByUsername){
        return res.status(401).json({
            ok : false,
            msg : "user already exist with this username"
        })
      }

      const hashedPassword = await bcrypt.hash(password , 12);
      const newUser = await prisma.user.create({
        data : {
            name : name,
            username : username,
            email : email,
            hashedPassword : hashedPassword
        }
      })
  
    return res.status(201).json({
        ok : true,
        msg : "Account Created",
        user : newUser
    })
       
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok : false ,
            msg : "error",
            error
        })
    }
}




// To Login -- Sign In into Existing Account
export const userLoginController = async(req : Request , res : Response) => {
    try {
        const {username ,password} = req.body;
        const parsedInput = userSchemaForLogin.safeParse({
            username , password
        })

        if(!parsedInput.success){
            return res.status(401).json({
                ok : false,
                msg : "Please Enter Valid Credentials",
                error : parsedInput.error
            })
        }

        const exisingUserByUsername = await prisma.user.findUnique({
            where : {
                username : username
            }
        })

        if(!exisingUserByUsername || !exisingUserByUsername.hashedPassword){
            return res.status(401).json({
                ok : false,
                msg : "User Not Found"
            })
        }

        const isPasswordSame = await bcrypt.compare(password , exisingUserByUsername.hashedPassword);

        if(!isPasswordSame) {
            return res.status(401).json({
                ok : false,
                msg : "Wrong Password"
            })
        }

        const token = jwt.sign({id : exisingUserByUsername.id }
            , envConfig.jwt_secret
            , {expiresIn : '24h'});
   
       
       return res.status(201).json({
           ok : true,
           token : token,
           msg : "Successful",
           user : exisingUserByUsername
       })


        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok : false,
            msg : "error",
            error : error
        })
    }
}