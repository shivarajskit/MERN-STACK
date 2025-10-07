import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createAccessToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });

const createRefreshToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    if (!email || !password || !userName) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create({ userName, email, password: hashed });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user.id.toString());
    const refreshToken = createRefreshToken(user.id.toString());

    // set HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.json({ accessToken, user: { id: user._id, userName: user.userName, email: user.email } });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET!, (err: any, payload: any) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      const newAccessToken = createAccessToken(payload.id);
      res.json({ accessToken: newAccessToken });
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/" });
  res.json({ message: "Logged out" });
};