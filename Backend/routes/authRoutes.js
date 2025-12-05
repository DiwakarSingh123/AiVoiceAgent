import express from "express";
import { Register,Loging, Logout, GoogleAuth } from "../Controllers/authAuthenticate.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter=express.Router();

authRouter.post('/register',Register);
authRouter.post('/login',Loging);
authRouter.post('/logout',authMiddleware,Logout);
authRouter.post('/google-auth',GoogleAuth);



export default authRouter;