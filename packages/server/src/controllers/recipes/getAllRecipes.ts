// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { RecipeClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetAllRecipesQueryObject from "../../core/types/recipes/GetAllRecipesQueryObjectType";
import RecipesIncludeObject from "../../core/types/recipes/RecipesIncludeObjectType";
import RecipesOrderByObject from "../../core/types/recipes/RecipesOrderByObjectType";

const getAllRecipes = async (req: Request, res: Response) => {
  const {
    userRecipes,
    userId,
    searchByKey,
    searchByValue,
    sortByKey,
    sortByOrder,
    includeMacros,
    includeUser,
    includeUtensils,
    includeIngredients,
    includeDayTemplates,
    includeInstanceTemplates,
    includeMealPrepPlans,
    includeRecipeTutorial,
  } = req.query;

  const queryObject: GetAllRecipesQueryObject = {};
  const orderByObject: RecipesOrderByObject = {};
  const includeObject: RecipesIncludeObject = {};

  // QUERY
  if (userRecipes) {
    queryObject.userId = userId as string;
  }

  if (searchByKey) {
    queryObject[searchByKey as string] = {
      contains: (searchByValue as string) || "",
    };
  }

  // ORDER BY
  if (sortByKey === "numberOfDayTemplates") {
    orderByObject.dayTemplates = { _count: sortByOrder as "asc" | "desc" };
  } else if (sortByKey) {
    orderByObject[sortByKey as string] = (sortByOrder as string) || "asc";
  }

  // INCLUDE
  if (includeMacros) {
    includeObject.macros = true;
  }
  if (includeUser) {
    includeObject.user = true;
  }
  if (includeIngredients) {
    includeObject.ingredients = true;
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
  if (includeRecipeTutorial) {
    includeObject.recipeTutorial = true;
  }

  const foundRecipes = await getOrSetCache(req.url, async () => {
    const recipes = await RecipeClient.findMany({
      where: queryObject,
      orderBy: orderByObject,
      include: includeObject,
    });
    return recipes;
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

export default getAllRecipes;
