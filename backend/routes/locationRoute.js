import express from "express";
import { createLocation } from "../controller/locationController.js";

const router = express.Router();

router.post("/create", createLocation);

export default router;
