import express from "express";
import { createClientInfo, getAllClientInfo, getOneClientInfo } from "../controllers/clientInfo.controller.js";
const router = express.Router();

router.post("/create", createClientInfo);
router.get("/", getAllClientInfo);
router.get("/:id", getOneClientInfo);

export default router;