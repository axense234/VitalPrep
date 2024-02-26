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

const router = express.Router();

router.get("/ingredients", authenticationMiddleware, getAllIngredients);

router.get(
  "/:userId/ingredients/:ingredientId",
  authenticationMiddleware,
  getIngredientById
);

router.post("/ingredients/create", authenticationMiddleware, createIngredient);

router.patch(
  "/ingredients/update/:ingredientId",
  authenticationMiddleware,
  updateIngredient
);

router.delete(
  "/ingredients/delete/:ingredientId",
  authenticationMiddleware,
  deleteIngredient
);

export default router;
