import { Request, Response } from "express";
import Task from "../models/Task";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface User {
      id: string;
      // add other user properties if needed
    }
    interface Request {
      user: User;
    }
  }
}



// GET /tasks
export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({ userId: req?.user.id });
  res.json(tasks);
};

// POST /tasks
export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const task = await Task.create({ title, userId: req.user.id });
  res.status(201).json(task);
};

// PATCH /tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: id, userId: req.user.id}, {completed: req.body.completed }, { new: true });
  res.json(task);
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Task.findByIdAndDelete({ _id: id, userId: req.user.id });
  res.json({ message: "Task deleted" });
};
