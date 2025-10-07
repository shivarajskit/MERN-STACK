import { Request, Response } from "express";
import Post from "../models/Post";
import Comment from "../models/Comment";
import { AuthRequest } from "../middleware/auth";

export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  const post = await Post.create({ title, content, author: req.userId });
  res.status(201).json(post);
};

export const getPosts = async (req: Request, res: Response) => {
  // populate author and latest comments if needed
  const posts = await Post.find().populate("author", "userName email").sort({ createdAt: -1 });
  res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id).populate("author", "userName email");
  if (!post) return res.status(404).json({ message: "Not found" });
  const comments = await Comment.find({ post: post._id }).populate("author", "userName email");
  res.json({ post, comments });
};

export const updatePost = async (req: AuthRequest, res: Response) => {
  const updated = await Post.findOneAndUpdate({ _id: req.params.id, author: req.userId }, req.body, { new: true });
  res.json(updated);
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  await Post.findOneAndDelete({ _id: req.params.id, author: req.userId });
  res.json({ message: "Deleted" });
};
