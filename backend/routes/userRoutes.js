import express from "express";
import {
  changeUserPassword,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controller/userController.js";
import { isAdminRoute, protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", registerUser);
router.post("/sign-in", loginUser);
router.post("/sign-out", logoutUser);

router.put("/profile", protectedRoute, updateUserProfile);
router.put("/change-password", protectedRoute, changeUserPassword);
// //   FOR ADMIN ONLY - ADMIN ROUTES

export default router;
