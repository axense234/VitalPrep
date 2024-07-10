// Express
import express from "express";
// Middleware
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";
// Controllers
import createRecipe from "../controllers/recipes/createRecipe";
import deleteRecipe from "../controllers/recipes/deleteRecipe";
import getAllRecipes from "../controllers/recipes/getAllRecipes";
import getRecipeById from "../controllers/recipes/getRecipeById";
import updateRecipe from "../controllers/recipes/updateRecipe";

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
