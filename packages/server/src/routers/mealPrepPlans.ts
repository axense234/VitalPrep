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
import allowRouteUse from "../middleware/adminUse";

const router = express.Router();

router.get(
  "/mealPrepPlans",
  allowRouteUse,
  authenticationMiddleware,
  getAllMealPrepPlans
);

router.get(
  "/:userId/mealPrepPlans/:mealPrepPlanId",
  allowRouteUse,
  authenticationMiddleware,
  getMealPrepPlanById
);

router.post(
  "/mealPrepPlans/create",
  allowRouteUse,
  authenticationMiddleware,
  createMealPrepPlan
);

router.patch(
  "/mealPrepPlans/update/:mealPrepPlanId",
  allowRouteUse,
  authenticationMiddleware,
  updateMealPrepPlan
);

router.delete(
  "/mealPrepPlans/delete/:mealPrepPlanId",
  allowRouteUse,
  authenticationMiddleware,
  deleteMealPrepPlan
);

export default router;
