// Express
import express from "express";
// Controllers and Middleware
import allowRouteUse from "../middleware/adminUse";
import deleteAllEntities from "../controllers/dangerous/deleteAllEntities";

const router = express.Router();

router.delete("/entities/deleteAllEntities", allowRouteUse, deleteAllEntities);

export default router;
