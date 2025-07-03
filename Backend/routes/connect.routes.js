import express from "express";
const router = express.Router();
import { createConnection } from "../controller/connect.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

router.post("/create", authenticate, createConnection);

export default router;
