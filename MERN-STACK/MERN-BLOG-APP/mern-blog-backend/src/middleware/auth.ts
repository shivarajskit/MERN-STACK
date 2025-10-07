import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET! ) as any;
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
