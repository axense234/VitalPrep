// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { RecipeClient } from "../db/postgres";
import { Ingredient, Recipe, Utensil } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

const getAllRecipes = async (req: Request, res: Response) => {
  const foundRecipes = await RecipeClient.findMany({});

  if (foundRecipes.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Could not find any recipes!", recipes: [] });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all recipes!",
    nbHits: foundRecipes.length,
    recipes: foundRecipes,
  });
};

const getRecipeById = async (req: Request, res: Response) => {
  const { recipeId } = req.params;

  if (!recipeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a recipe id!", recipe: {} });
  }

  const foundRecipe = await getOrSetCache(`recipes:${recipeId}`, async () => {
    const recipe = await RecipeClient.findUnique({
      where: { id: recipeId },
      include: {
        macros: true,
        utensils: true,
        ingredients: true,
        dayTemplates: true,
        recipeTutorial: true,
        user: true,
      },
    });
    return recipe as Recipe;
  });

  if (!foundRecipe) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find any recipes with id:${recipeId}...`,
      recipe: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found recipe with id:${recipeId}.`,
    recipe: foundRecipe,
  });
};

const createRecipe = async (req: Request, res: Response) => {
  const recipeBody = req.body;

  if (!recipeBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", recipe: {} });
  }

  if (!recipeBody.ingredients) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Cannot create recipe without ingredients!",
      recipe: {},
    });
  }

  if (!recipeBody.utensils) {
    recipeBody.utensils = [];
  }

  const ingredients = recipeBody.ingredients as Ingredient[];
  const utensil = recipeBody.utensils as Utensil[];

  const createdRecipe = await RecipeClient.create({
    data: {
      ...recipeBody,
      ingredients: {
        connect: ingredients.map((ingredient) => ({
          id: ingredient.id,
        })),
      },
      utensils: {
        connect: utensil.map((utensil) => ({
          id: utensil.id,
        })),
      },
    },
    include: {
      macros: true,
      utensils: true,
      ingredients: true,
      dayTemplates: true,
      recipeTutorial: true,
      user: true,
    },
  });

  if (!createdRecipe) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not create recipe! Verify the request body!",
      recipe: {},
    });
  }

  await deleteCache(`recipes`);
  await deleteCache("users");
  await deleteCache(`users:${createdRecipe.userId}`);
  await setCache(`recipes:${createdRecipe.id}`, createdRecipe);

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created recipe with id:${createdRecipe.id}.`,
    recipe: createdRecipe,
  });
};

const updateRecipe = async (req: Request, res: Response) => {
  const { recipeId } = req.params;
  const recipeBody = req.body;

  if (!recipeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a recipe id!", recipe: {} });
  }

  if (!recipeBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", recipe: {} });
  }

  const ingredients = recipeBody.ingredients as Ingredient[];
  const utensils = recipeBody.utensils as Utensil[];

  const updatedRecipe = await RecipeClient.update({
    where: { id: recipeId },
    data: {
      ...recipeBody,
      ingredients: {
        connect: ingredients.map((ingredient) => ({
          id: ingredient.id,
        })),
      },
      utensils: {
        connect: utensils.map((utensil) => ({
          id: utensil.id,
        })),
      },
    },
    include: {
      macros: true,
      utensils: true,
      ingredients: true,
      dayTemplates: true,
      recipeTutorial: true,
      user: true,
    },
  });

  if (!updatedRecipe) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find recipe with id:${recipeId}...`,
      recipe: {},
    });
  }

  await setCache(`recipes:${updatedRecipe.id}`, updatedRecipe);

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated recipe with id:${recipeId}.`,
    recipe: updatedRecipe,
  });
};

const deleteRecipe = async (req: Request, res: Response) => {
  const { recipeId } = req.params;

  if (!recipeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a recipe id!", recipe: {} });
  }

  const deletedRecipe = await RecipeClient.delete({
    where: { id: recipeId },
    include: {
      macros: true,
      utensils: true,
      ingredients: true,
      dayTemplates: true,
      recipeTutorial: true,
      user: true,
    },
  });

  if (!deletedRecipe) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find recipe with id:${recipeId}...`,
      recipe: {},
    });
  }

  await deleteCache(`recipes:${deletedRecipe.id}`);

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted recipe with id:${recipeId}.`,
    recipe: deletedRecipe,
  });
};

export {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
