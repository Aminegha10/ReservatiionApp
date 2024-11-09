import express from "express";
import { createPrestataire, deletePrestataire, getAllPrestataires, updatePrestataire } from "../controllers/prestataire.controller.js";

const router = express.Router();
router
.get("/", getAllPrestataires)
.put("/:id", updatePrestataire)
.post("/create", createPrestataire)
.delete("/:id", deletePrestataire)


export default router;