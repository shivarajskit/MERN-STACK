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

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );
      res.status(201).json({ token });
  } catch (err: Error | any) {
      res.status(500).json({error: err.message});
  }
}