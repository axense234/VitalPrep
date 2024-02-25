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

router.get("/recipes/:recipeId", authenticationMiddleware, getRecipeById);

router.post("/ingredients/create", authenticationMiddleware, createRecipe);

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
