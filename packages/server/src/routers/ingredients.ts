import express from "express";

// Controllers and Middleware
import {
  createIngredient,
  deleteIngredient,
  getAllIngredients,
  getIngredientById,
  updateIngredient,
} from "../controllers/ingredients";
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";

const router = express.Router();

router.get(
  "/ingredients",
  allowRouteUse,
  authenticationMiddleware,
  getAllIngredients
);

router.get(
  "/:userId/ingredients/:ingredientId",
  allowRouteUse,
  authenticationMiddleware,
  getIngredientById
);

router.post("/ingredients/create", authenticationMiddleware, createIngredient);

router.patch(
  "/ingredients/update/:ingredientId",
  allowRouteUse,
  authenticationMiddleware,
  updateIngredient
);

router.delete(
  "/ingredients/delete/:ingredientId",
  allowRouteUse,
  authenticationMiddleware,
  deleteIngredient
);

export default router;
