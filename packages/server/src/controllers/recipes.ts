// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { IngredientClient, RecipeClient, UtensilClient } from "../db/postgres";
import { Ingredient, Macros, Recipe, Utensil } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

type RecipeQueryObject = {
  userId?: string;
};

const getAllRecipes = async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const getAllUserRecipes = req.query.userRecipes;

  const queryObject: RecipeQueryObject = {};

  if (getAllUserRecipes) {
    queryObject.userId = userId as string;
  }

  const foundRecipes = await getOrSetCache("recipes", async () => {
    const recipes = await RecipeClient.findMany({
      where: queryObject,
      include: {
        macros: true,
        utensils: true,
        ingredients: true,
        dayTemplates: true,
        recipeTutorial: true,
        user: true,
      },
    });
    return recipes as Recipe[];
  });

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
  const { recipeId, userId } = req.params;

  if (!recipeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a recipe id!", recipe: {} });
  }

  const foundRecipe = await getOrSetCache(
    `${userId}:recipes:${recipeId}`,
    async () => {
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
    }
  );

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

type IngredientTemplate = Ingredient & {
  macros: Macros;
};

const createRecipe = async (req: Request, res: Response) => {
  const recipeBody = req.body;
  const userId = req.query.userId;

  if (userId) {
    recipeBody.user = { connect: { id: userId } };
  }

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

  const recipeTutorial = {
    writtenTutorial: recipeBody.writtenTutorial || "",
    videoTutorial: recipeBody.videoTutorial || "",
  };

  delete recipeBody.writtenTutorial;
  delete recipeBody.videoTutorial;

  const ingredientsIds = recipeBody.ingredients as string[];
  const utensilsIds = recipeBody.utensils as string[];

  const foundIngredients = (await IngredientClient.findMany({
    where: { id: { in: ingredientsIds } },
    include: { macros: true },
  })) as IngredientTemplate[];

  if (foundIngredients.length < 1) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not find the ingredients with the given ids!",
      ingredients: [],
    });
  }

  let recipeMacros = {
    calories: 0,
    carbsAmount: 0,
    fatsAmount: 0,
    proteinAmount: 0,
  };

  foundIngredients.forEach((ingredient) => {
    recipeMacros.calories += ingredient.macros.calories;
    recipeMacros.proteinAmount += ingredient.macros.proteinAmount;
    recipeMacros.carbsAmount += ingredient.macros.carbsAmount;
    recipeMacros.fatsAmount += ingredient.macros.fatsAmount;
  });

  const createdRecipe = await RecipeClient.create({
    data: {
      ...recipeBody,
      ingredients: {
        connect: ingredientsIds.map((ingredientId) => ({
          id: ingredientId,
        })),
      },
      utensils: {
        connect: utensilsIds.map((utensilId) => ({
          id: utensilId,
        })),
      },
      macros: {
        create: recipeMacros,
      },
      recipeTutorial: {
        create: recipeTutorial,
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
  await deleteCache(`${createdRecipe.userId}:recipes`);

  await setCache(
    `${createdRecipe.userId}:recipes:${createdRecipe.id}`,
    createdRecipe
  );

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
      message: `Could not update recipe with id:${recipeId}...`,
      recipe: {},
    });
  }

  await deleteCache(`recipes`);
  await deleteCache(`${updatedRecipe.userId}:recipes`);

  await setCache(
    `${updatedRecipe.userId}:recipes:${updatedRecipe.id}`,
    updatedRecipe
  );

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
      message: `Could not delete recipe with id:${recipeId}...`,
      recipe: {},
    });
  }

  await deleteCache(`recipes`);
  await deleteCache(`${deletedRecipe.userId}:recipes`);

  await deleteCache(`${deletedRecipe.userId}:recipes:${deletedRecipe.id}`);

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
