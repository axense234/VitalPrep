import express from "express";

// Controllers and Middleware
import {
  createMealPrepPlan,
  deleteMealPrepPlan,
  getAllMealPrepPlans,
  getMealPrepPlanById,
  updateMealPrepPlan,
} from "../controllers/mealPrepPlans";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/mealPrepPlans", authenticationMiddleware, getAllMealPrepPlans);

router.get(
  "/:userId/mealPrepPlans/:mealPrepPlanId",
  authenticationMiddleware,
  getMealPrepPlanById
);

router.post(
  "/mealPrepPlans/create",
  authenticationMiddleware,
  createMealPrepPlan
);

router.patch(
  "/mealPrepPlans/update/:mealPrepPlanId",
  authenticationMiddleware,
  updateMealPrepPlan
);

router.delete(
  "/mealPrepPlans/delete/:mealPrepPlanId",
  authenticationMiddleware,
  deleteMealPrepPlan
);

export default router;
