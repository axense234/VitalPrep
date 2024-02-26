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

const router = express.Router();

router.get("/recipes", authenticationMiddleware, getAllRecipes);

router.get(
  "/:userId/recipes/:recipeId",
  authenticationMiddleware,
  getRecipeById
);

router.post("/recipes/create", authenticationMiddleware, createRecipe);

router.patch(
  "/recipes/update/:recipeId",
  authenticationMiddleware,
  updateRecipe
);

router.delete(
  "/recipes/delete/:recipeId",
  authenticationMiddleware,
  deleteRecipe
);

export default router;
