import express, { response } from "express";
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import uploadOnCloudinary from "../config/cloudinary.js";
import GemniResponse from "../Gemni.js";
import moment from "moment";


// get the current user ......
export const getCurrentUser = async (req, res) => {
  try {
   
     res.status(201).json({
      user:req.result,
      message: "valid user" 
      });
  } catch (err) {
    return res.status(500).json({ message: "User not found", err });
  }
};


// Upoad photo on Cloudinary ......
export const setCloudinary = async (req, res) => {
  try {
    const userId = req.result._id;
    const { name } = req.body;

    let finalImage = null;

    // Case 1: User uploaded custom image → Cloudinary upload
    if (req.file) {
      const imageUrl = await uploadOnCloudinary(req.file.path);
      finalImage = imageUrl;
    } 
    else if (req.body.photo) { // Case 2: Predefined image URL → frontend string send karta hai
      finalImage = req.body.photo; // direct save
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        assistantName: name,
        assistantImage: finalImage,
      },
      { new: true }
    );

    console.log(updatedUser);
    
    return res.status(200).json({
      success: true,
      message: "Assistant updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};


// Ask to Assistants................
export const askWithAssistat = async (req,res) =>{
  try {
    const {prompt}=req.body;
    const user=await User.findById(req.result._id)
    user.history.push(prompt);
    await user.save();
    const userName=user.name;
    const assistantName=user.assistantName;
    const result=await GemniResponse(prompt,userName,assistantName);

    const jsonMatch=result.match(/{[\s\S]*}/)
    if(!jsonMatch){
      return res.status(400).json({ response: "Sorry i can't understand" });
    }

    const Gemresult=JSON.parse(jsonMatch[0]);
    const type=Gemresult.type;

    // here switch cases............
    switch(type){
      case 'get_date' :
        return res.json({
          type,
          userInput:Gemresult.userInput,
          response:`Current date is ${moment().format("DD/MM/YYYY")}` 
        });
      case 'get_time' :
        return res.json({
          type,
          userInput:Gemresult.userInput,
          response:`Current time is ${moment().format("hh:mm A")}` 
        });
      case 'get_day' :
        return res.json({
          type,
          userInput:Gemresult.userInput,
          response:`Todey is ${moment().format("dddd")}` 
        });
      case 'get_month' :
        return res.json({
          type,
          userInput:Gemresult.userInput,
          response:`Current Month is ${moment().format("MMMM")}` 
        });
      case "general" :
      case "google_search" :
      case "youtube_search" :
      case "youtube_play" :
      case "calculator_open" :
      case "instagram_open" :
      case "facebook_open" :
      case "weather-show" :
      case "linkedIn_open" :
      case "twitter_open" :
      case "whatsapp_open" :
      case "gmail_open" :
      case "about_cricket" :
      case "maps_open" :
      case "calendar_open" :
         return res.json({
          type,
          userInput:Gemresult.userInput,
          response:Gemresult.response 
        });

      default:
        return res.json({
          response: "Sorry, I didn't understand that."
        });

    }


  } catch (error) {
     return res.status(500).json({ response: "Ask assistant error ?."});
  }
}
