// Express
import express from "express";
// Middleware
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";
// Controllers
import createIngredient from "../controllers/ingredients/createIngredient";
import deleteIngredient from "../controllers/ingredients/deleteIngredient";
import getAllIngredients from "../controllers/ingredients/getAllIngredients";
import getIngredientById from "../controllers/ingredients/getIngredientById";
import updateIngredient from "../controllers/ingredients/upgradeIngredient";

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

router.post(
  "/ingredients/create",
  allowRouteUse,
  authenticationMiddleware,
  createIngredient
);

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
