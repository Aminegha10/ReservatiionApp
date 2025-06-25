import express from "express";
const router = express.Router();
import { create, get, remove } from "../controllers/favorite.controller.js";

router
  .post("/:clientId", create) // Add favorite
  .get("/:clientId", get) // Get favorites
  .delete("/:clientId", remove); // Remove favorite

export default router;
