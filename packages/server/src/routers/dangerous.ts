import express from "express";

// Controllers and Middleware
import { deleteAllEntities } from "../controllers/dangerous";

const router = express.Router();

router.delete("/entities/deleteAllEntities", deleteAllEntities);

export default router;
