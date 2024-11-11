import express from "express";
import { createClientInfo, getAllClientInfo } from "../controllers/clientInfo.controller.js";
const router = express.Router();

router.post("/create", createClientInfo);
router.get("/", getAllClientInfo)

export default router;