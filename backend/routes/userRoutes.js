import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/userController.js";
import { isAdminRoute, protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", registerUser);
router.post("/sign-in", loginUser);
router.post("/sign-out", logoutUser);

// //   FOR ADMIN ONLY - ADMIN ROUTES

export default router;
