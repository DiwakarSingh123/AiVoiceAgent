import mongoose from "mongoose";

const main = async () =>{
    try{
       await mongoose.connect(process.env.DATABASE_URL);
        // console.log("hellow");
    }catch(err){
        console.log("Error is "+ err);
        
    }
}

export default main;