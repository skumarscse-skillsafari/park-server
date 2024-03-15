import express from "express";
import {
  getAllUsers,
  getUserById,
  signup,
  signin,
  updateUserById,
  deleteUserById,
} from "../controllers/userController.js";
const router = express.Router();

// getAllUsers
// http://localhost:5000/api/v1/users
router.get("/", getAllUsers);

// getUserById
// http://localhost:5000/api/v1/users/:id
router.get("/:id", getUserById);

// signup
// http://localhost:5000/api/v1/users/signup
router.post("/signup", signup);

// signin
// http://localhost:5000/api/v1/users/signin
router.post("/signin", signin);

// update
// http://localhost:5000/api/v1/users/:id
router.put("/:id", updateUserById);

// delete
// http://localhost:5000/api/v1/users/:id
router.delete("/:id", deleteUserById);

export default router;
