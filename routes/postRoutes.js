import express from "express";
const router = express.Router();
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from "../controllers/postController.js";
import auth from "./auth.js";

// createPost
// http://localhost:5000/api/v1/posts
router.post("/:id", auth, createPost);

// getAllPosts
// http://localhost:5000/api/v1/posts
router.get("/", getAllPosts);

// getPostById
// http://localhost:5000/api/v1/posts/:id
router.get("/:id", getPostById);

// updatePostById
// http://localhost:5000/api/v1/posts/:id
router.put("/:id", updatePostById);

// deletePostById
// http://localhost:5000/api/v1/posts/:id
router.delete("/:id", deletePostById);

export default router;
