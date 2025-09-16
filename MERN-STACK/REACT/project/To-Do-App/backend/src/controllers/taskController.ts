import { Request, Response } from "express";
import Task from "../models/Task";

// GET /tasks
export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// POST /tasks
export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const task = await Task.create({ title });
  res.status(201).json(task);
};

// PATCH /tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(task);
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: "Task deleted" });
};
