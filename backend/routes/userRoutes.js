import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
 
} from "../controller/userController.js";
import { isAdminRoute, protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", createUser);
router.post("/sign-in", loginUser);
router.post("/sign-out", logoutUser);

// //   FOR ADMIN ONLY - ADMIN ROUTES

export default router;
