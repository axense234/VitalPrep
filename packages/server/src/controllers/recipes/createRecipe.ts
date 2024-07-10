// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { IngredientClient, RecipeClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";
// Types
import IngredientTemplate from "../../core/types/recipes/IngredientTemplateType";

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

  delete recipeBody.recipeTutorial.id;
  const recipeTutorial = recipeBody.recipeTutorial;
  delete recipeBody.recipeTutorial;

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

  await handleCacheMutation("recipes", userId as string);

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created recipe with id:${createdRecipe.id}.`,
    recipe: createdRecipe,
  });
};

export default createRecipe;
