import express from "express";

// Controllers and Middleware
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from "../controllers/recipes";
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";

const router = express.Router();

router.get("/recipes", allowRouteUse, authenticationMiddleware, getAllRecipes);

router.get(
  "/:userId/recipes/:recipeId",
  allowRouteUse,
  authenticationMiddleware,
  getRecipeById
);

router.post(
  "/recipes/create",
  allowRouteUse,
  authenticationMiddleware,
  createRecipe
);

router.patch(
  "/recipes/update/:recipeId",
  allowRouteUse,
  authenticationMiddleware,
  updateRecipe
);

router.delete(
  "/recipes/delete/:recipeId",
  allowRouteUse,
  authenticationMiddleware,
  deleteRecipe
);

export default router;
