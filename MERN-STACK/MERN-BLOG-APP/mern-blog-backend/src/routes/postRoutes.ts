import { Router } from "express";
import * as postCtrl from "../controllers/postController";
import { authenticate } from "../middleware/auth";

const router = Router();
router.get("/", postCtrl.getPosts);
router.get("/:id", postCtrl.getPost);
router.post("/", authenticate, postCtrl.createPost);
router.patch("/:id", authenticate, postCtrl.updatePost);
router.delete("/:id", authenticate, postCtrl.deletePost);

export default router;
