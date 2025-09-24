import { Request, Response } from "express";
import User from "../models/User";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const registerUser = async (req: Request, res: Response) => {
  // Registration logic here
  try {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(400).json({message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({userName, email, password: hashedPassword});
    await newUser.save();

    res.status(201).json({msg: "User registered successfully"});
  } catch (err: Error | any) {  
      res.status(500).json({error: err.message});
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({email});
      if(!user) {
          return res.status(400).json({message: "Invalid credentials"});
      }

      const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const accessToken  = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
          { id: user._id },
          process.env.JWT_REFRESH_SECRET!,
          { expiresIn: "7d" }
        );

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

      res.status(201).json({ accessToken, user: { id: user._id, email: user.email } });
  } catch (err: Error | any) {
      res.status(500).json({error: err.message});
  }
}

export const refreshToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  });
}

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // use secure in prod
    sameSite: "strict"
  })
  return res.status(200).json({ message: "Logged out successfully"});
}