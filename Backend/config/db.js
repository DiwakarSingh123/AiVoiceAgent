import mongoose from "mongoose";

const main = async () =>{
    try{
       const dbUrl = process.env.DATABASE_URL?.replace(/['"]/g, '');
       await mongoose.connect(dbUrl);
        // console.log("hellow");
    }catch(err){
        console.log("Error is "+ err);
        
    }
}

export default main;