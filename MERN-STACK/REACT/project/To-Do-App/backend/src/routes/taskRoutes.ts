import express = require("express");
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController";
const auth = require("../middleware/auth.js");

const router = express.Router();

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.patch("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
