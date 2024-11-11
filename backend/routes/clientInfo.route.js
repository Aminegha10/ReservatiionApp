import express from "express";
import { createClientInfo } from "../controllers/clientInfo.controller.js";
const router = express.Router();

router.post("/create", createClientInfo);

export default router;