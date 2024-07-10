// Express
import express from "express";
// Middleware
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";
// Controllers
import createMealPrepLog from "../controllers/mealPrepLogs/createMealPrepLog";
import deleteMealPrepLog from "../controllers/mealPrepLogs/deleteMealPrepLog";
import getAllMealPrepLogs from "../controllers/mealPrepLogs/getAllMealPrepLogs";
import getMealPrepLogById from "../controllers/mealPrepLogs/getMealPrepLogById";
import updateMealPrepLog from "../controllers/mealPrepLogs/updateMealPrepLog";

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
