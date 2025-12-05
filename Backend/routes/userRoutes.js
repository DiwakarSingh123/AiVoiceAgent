import express from "express";
import {getCurrentUser,setCloudinary,askWithAssistat } from "../Controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload} from "../middleware/multer.js";

const userRouter=express.Router();

userRouter.get('/getuser',authMiddleware,getCurrentUser);
userRouter.post('/set-cloudinary',authMiddleware,upload.single("photo"),setCloudinary);
userRouter.post('/asktoassistant',authMiddleware,askWithAssistat);




export default userRouter;