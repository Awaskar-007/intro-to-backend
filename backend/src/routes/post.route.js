import { Router } from "express";
import {
    createPost,
    deletePost,
    getPosts,
    updatePost
} from "../../controller/post.controller.js";

const router = Router();

router.post("/create", createPost);
router.get("/getPosts", getPosts);
router.patch("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;