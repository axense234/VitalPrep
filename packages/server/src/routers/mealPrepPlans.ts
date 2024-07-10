// Express
import express from "express";
// Middleware
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";
// Controllers
import createMealPrepPlan from "../controllers/mealPrepPlans/createMealPrepPlan";
import deleteMealPrepPlan from "../controllers/mealPrepPlans/deleteMealPrepPlan";
import getAllMealPrepPlans from "../controllers/mealPrepPlans/getAllMealPrepPlans";
import getMealPrepPlanById from "../controllers/mealPrepPlans/getMealPrepPlanById";
import updateMealPrepPlan from "../controllers/mealPrepPlans/updateMealPrepPlan";

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
