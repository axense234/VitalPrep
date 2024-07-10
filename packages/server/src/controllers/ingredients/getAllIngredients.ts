// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { IngredientClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetAllIngredientsQueryObject from "../../core/types/ingredients/GetAllIngredientsQueryObjectType";
import IngredientsIncludeObject from "../../core/types/ingredients/IngredientsIncludeObjectType";
import IngredientsOrderByObject from "../../core/types/ingredients/IngredientsOrderByObjectType";

const getAllIngredients = async (req: Request, res: Response) => {
  const {
    userIngredients,
    userId,
    searchByKey,
    searchByValue,
    sortByKey,
    sortByOrder,
    includeMacros,
    includeUser,
    includeRecipes,
    includeDayTemplates,
    includeInstanceTemplates,
    includeMealPrepPlans,
  } = req.query;

  const queryObject: GetAllIngredientsQueryObject = {};
  const orderByObject: IngredientsOrderByObject = {};
  const includeObject: IngredientsIncludeObject = {};

  // QUERY
  if (userIngredients) {
    queryObject.userId = userId as string;
  }

  if (searchByKey) {
    queryObject[searchByKey as string] = {
      contains: (searchByValue as string) || "",
    };
  }

  // ORDER BY
  if (sortByKey === "numberOfRecipes") {
    orderByObject.recipes = { _count: sortByOrder as "asc" | "desc" };
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
  if (includeRecipes) {
    includeObject.recipes = true;
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

  const foundIngredients = await getOrSetCache(req.url, async () => {
    const ingredients = await IngredientClient.findMany({
      orderBy: orderByObject,
      where: queryObject,
      include: includeObject,
    });
    return ingredients;
  });

  if (foundIngredients.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Could not find any ingredients!", ingredients: [] });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all ingredients!",
    nbHits: foundIngredients.length,
    ingredients: foundIngredients,
  });
};

export default getAllIngredients;
