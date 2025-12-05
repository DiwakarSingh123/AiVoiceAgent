import UserModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";

export const authMiddleware = async (req,res,next) =>{

   try{
   
     const token = req.cookies.token;
    
     
    if(!token){
        throw new Error("Token invalied");
        
    }
    

    const payload=jwt.verify(token,process.env.JWT_SECRATE_KEY);
    // if(payload.role!='user'){
    //     throw new Error("You are not admin");
    // }

    const _id=payload._id;
    
    if(!_id){
        throw new Error("Token invalied");
    }

    const result=await UserModel.findById(_id);
    if(!result){
        throw new Error("User not found");
    }

    //check token is already blocked or not
    const tokenBlocked=await redisClient.exists(`token:${token}`);
    if(tokenBlocked){
        throw new Error("Token is Invalied");
    }

    req.result=result;
    next();

   }
   catch(err){
    res.status(401).json({message:err.message});
   }

}