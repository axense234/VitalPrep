// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { RecipeClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const updateRecipe = async (req: Request, res: Response) => {
  const { recipeId } = req.params;
  const recipeBody = req.body;
  const { userId, updateRecipeSingle } = req.query;

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

  if (recipeBody.user || userId) {
    recipeBody.user = {
      connect: { id: recipeBody?.user?.id || userId },
    };
    delete recipeBody?.userId;
  }

  if (recipeBody.macros) {
    recipeBody.macros = { update: recipeBody.macros };
    delete recipeBody?.macrosId;
  }

  if (recipeBody.recipeTutorial) {
    recipeBody.recipeTutorial = { update: recipeBody.recipeTutorial };
    delete recipeBody?.recipeTutorialId;
  }

  if (updateRecipeSingle) {
    delete recipeBody?.dayTemplates;
    delete recipeBody?.instanceTemplates;
    delete recipeBody?.mealPrepPlans;
    delete recipeBody?.mealPrepLogs;
  }

  const ingredients = recipeBody.ingredients as string[];
  const utensils = recipeBody.utensils as string[];

  const updatedRecipe = await RecipeClient.update({
    where: { id: recipeId },
    data: {
      ...recipeBody,
      ingredients: {
        connect: ingredients.map((ingredient) => ({
          id: ingredient,
        })),
      },
      utensils: {
        connect: utensils.map((utensil) => ({
          id: utensil,
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

  await handleCacheMutation("recipes", userId as string, updatedRecipe.id);

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated recipe with id:${recipeId}.`,
    recipe: updatedRecipe,
  });
};

export default updateRecipe;
