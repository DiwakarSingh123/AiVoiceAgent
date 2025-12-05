import express from "express";
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import redisClient from "../config/redis.js";

//Register code........
export const Register = async (req, res) => {
  try {


    const { name, email, assistantName, history, password } = req.body;

    console.log("Received:", req.body);

    // Required check
    if (!name || !email ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    let existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be atleast 6 Character" });
    }

    const hashed = await bcrypt.hash(password || "Diwakar@123", 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
    });

    // genrate token
    const token = jwt.sign({ "_id": newUser._id, "email": newUser.email, "name": newUser.name }, process.env.JWT_SECRATE_KEY, { expiresIn: "7d" })
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    res.status(201).json({
      success: true,
      user: newUser,
      message: "User Registered Successfully",
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//SingIn code........
export const Loging = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not exist !" })
    }


    //hasing the password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new Error("Invalied Creadiantial !");

    }
    // genrate token....
    const token = jwt.sign({ "_id": user._id, "email": user.email, "name": user.name }, process.env.JWT_SECRATE_KEY, { expiresIn: "7d" })
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    res.status(200).json({
      user,
      message: "User Login Seccesfully"
    });
  } catch (err) {
    console.error("SignIn Error:", err.message);
    return res.status(500).json({ message: "Somethings is error", error: err.message });
  }

}

// user logout...
export const Logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    const payload = jwt.decode(token);
    console.log(payload);


    await redisClient.set(`token:${token}`, "Bloacked");

    await redisClient.expireAt(`token:${token}`, payload.exp);
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).json({ message: "Logout Successfully" });

  }
  catch (err) {
    res.status(401).send("Error" + err);
  }
}




// continueWithGoogle auth......
export const GoogleAuth = async (req, res) => {
  try {
    const { email } = req.body;
  
    let user = await User.findOne({ email });

    //  USER EXISTS → LOGIN
    if (user) {
      // genrate token
    const token = jwt.sign({ "_id": user._id, "email": user.email, "name": user.name }, process.env.JWT_SECRATE_KEY, { expiresIn: "7d" })
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

      return res.status(200).json({
        success: true,
        message: "Login Successful",
        user
      });
    }

    //  If User is not existed SIGNUP....................
    user = await User.create({
      email,
      name: req.body.name,
    });

     // genrate token
    const token = jwt.sign({ "_id": user._id, "email": user.email, "name": user.name }, process.env.JWT_SECRATE_KEY, { expiresIn: "7d" })
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    return res.status(200).json({
      success: true,
      message: "Signup Successful",
      user,
    });

  } catch (err) {
    return res.status(500).json({ message: "Google error", error: err.message });
  }
};
