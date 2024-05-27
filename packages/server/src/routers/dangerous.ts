import express from "express";

// Controllers and Middleware
import { deleteAllEntities } from "../controllers/dangerous";
import allowRouteUse from "../middleware/adminUse";

const router = express.Router();

router.delete("/entities/deleteAllEntities", allowRouteUse, deleteAllEntities);

export default router;
