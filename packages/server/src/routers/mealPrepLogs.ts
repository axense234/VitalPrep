import express from "express";

// Controllers and Middleware
import {
  createMealPrepLog,
  deleteMealPrepLog,
  getAllMealPrepLogs,
  getMealPrepLogById,
  updateMealPrepLog,
} from "../controllers/mealPrepLogs";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/mealPrepLogs", authenticationMiddleware, getAllMealPrepLogs);

router.get(
  "/mealPrepLogs/:mealPrepLogId",
  authenticationMiddleware,
  getMealPrepLogById
);

router.post(
  "/mealPrepLogs/create",
  authenticationMiddleware,
  createMealPrepLog
);

router.patch(
  "/mealPrepLogs/update/:mealPrepLogId",
  authenticationMiddleware,
  updateMealPrepLog
);

router.delete(
  "/mealPrepLogs/delete/:mealPrepLogId",
  authenticationMiddleware,
  deleteMealPrepLog
);

export default router;
