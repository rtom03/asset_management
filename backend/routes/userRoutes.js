import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  updateUserInfo,
} from "../controller/userController.js";
import { isAdmin, protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-user", createUser);
router.post("/sign-in", loginUser);
router.post("/sign-out", logoutUser);
router.put("/update-user", protectedRoute, isAdmin, updateUserInfo);

// //   FOR ADMIN ONLY - ADMIN ROUTES

export default router;
