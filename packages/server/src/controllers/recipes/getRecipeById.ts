// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { RecipeClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetRecipeByIdQueryObject from "../../core/types/recipes/GetRecipeByIdQueryObjectType";
import RecipesIncludeObject from "../../core/types/recipes/RecipesIncludeObjectType";

const getRecipeById = async (req: Request, res: Response) => {
  const { recipeId } = req.params;
  const {
    includeRecipeTutorial,
    includeMacros,
    includeUser,
    includeUtensils,
    includeIngredients,
    includeIngredientsMacros,
    includeDayTemplates,
    includeInstanceTemplates,
    includeMealPrepPlans,
  } = req.query;

  const includeObject: RecipesIncludeObject = {};
  const queryObject: GetRecipeByIdQueryObject = { id: "" };

  if (!recipeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a recipe id!", recipe: {} });
  }
  queryObject.id = recipeId;

  // INCLUDE
  if (includeRecipeTutorial) {
    includeObject.recipeTutorial = true;
  }
  if (includeMacros) {
    includeObject.macros = true;
  }
  if (includeUser) {
    includeObject.user = true;
  }
  if (includeIngredients) {
    includeObject.ingredients = true;
  }
  if (includeIngredientsMacros && includeIngredients) {
    includeObject.ingredients = { include: { macros: true } };
  }
  if (includeUtensils) {
    includeObject.utensils = true;
  }
  if (includeDayTemplates) {
    includeObject.dayTemplates = true;
  }
  if (includeInstanceTemplates) {
    includeObject.instanceTemplates = true;
  }
  if (includeMealPrepPlans) {
    includeObject.mealPrepPlans = true;
  }

  const foundRecipe = await getOrSetCache(req.url, async () => {
    const recipe = await RecipeClient.findUnique({
      where: queryObject,
      include: includeObject,
    });
    return recipe;
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

export default getRecipeById;
