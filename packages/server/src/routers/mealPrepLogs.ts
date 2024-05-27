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
import allowRouteUse from "../middleware/adminUse";

const router = express.Router();

router.get(
  "/mealPrepLogs",
  allowRouteUse,
  authenticationMiddleware,
  getAllMealPrepLogs
);

router.get(
  "/:userId/mealPrepLogs/:mealPrepLogId",
  allowRouteUse,
  authenticationMiddleware,
  getMealPrepLogById
);

router.post(
  "/mealPrepLogs/create",
  allowRouteUse,
  authenticationMiddleware,
  createMealPrepLog
);

router.patch(
  "/mealPrepLogs/update/:mealPrepLogId",
  allowRouteUse,
  authenticationMiddleware,
  updateMealPrepLog
);

router.delete(
  "/mealPrepLogs/delete/:mealPrepLogId",
  allowRouteUse,
  authenticationMiddleware,
  deleteMealPrepLog
);

export default router;
