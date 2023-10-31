import {z} from 'zod';

 export const userSchemaForRegister = z.object({
    username : z.string().min(3).max(20),
    name : z.string().min(3).max(25),
    email : z.string().email(),
    password : z.string().min(4).max(20)    
})

export const userSchemaForLogin = z.object({
    username : z.string().min(3).max(20),
    password : z.string().min(4).max(20)
})