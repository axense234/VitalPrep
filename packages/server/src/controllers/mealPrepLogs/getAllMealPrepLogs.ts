// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { MealPrepLogClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetAllMealPrepLogsQueryObject from "../../core/types/mealPrepLogs/GetAllMealPrepLogsQueryObjectType";
import MealPrepLogsIncludeObject from "../../core/types/mealPrepLogs/MealPrepLogsIncludeObjectType";
import MealPrepLogsOrderByObject from "../../core/types/mealPrepLogs/MealPrepLogsOrderByObjectType";

const getAllMealPrepLogs = async (req: Request, res: Response) => {
  const {
    userMealPrepLogs,
    userId,
    searchByKey,
    searchByValue,
    sortByKey,
    sortByOrder,
    includeUser,
    includeIngredients,
    includeIngredientsMacros,
    includeUtensils,
    includeRecipes,
    includeRecipesMacros,
    includeDayTemplates,
    includeDayTemplatesMacros,
    includeInstanceTemplate,
    includeInstanceTemplateMacros,
  } = req.query;

  const queryObject: GetAllMealPrepLogsQueryObject = {};
  const orderByObject: MealPrepLogsOrderByObject = {};
  const includeObject: MealPrepLogsIncludeObject = {};

  // QUERY
  if (userMealPrepLogs) {
    queryObject.userId = userId as string;
  }

  if (searchByKey) {
    queryObject[searchByKey as string] = {
      contains: (searchByValue as string) || "",
    };
  }

  // ORDER BY
  if (sortByKey) {
    orderByObject[sortByKey as string] = (sortByOrder as string) || "asc";
  }

  // INCLUDE
  if (includeUser) {
    includeObject.user = true;
  }
  if (includeIngredients) {
    includeObject.ingredients = true;
  }
  if (includeIngredients && includeIngredientsMacros) {
    includeObject.ingredients = { include: { macros: true } };
  }
  if (includeUtensils) {
    includeObject.utensils = true;
  }
  if (includeRecipes) {
    includeObject.recipes = true;
  }
  if (includeRecipes && includeRecipesMacros) {
    includeObject.recipes = { include: { macros: true } };
  }
  if (includeDayTemplates) {
    includeObject.dayTemplates = true;
  }
  if (includeDayTemplates && includeDayTemplatesMacros) {
    includeObject.dayTemplates = { include: { macros: true } };
  }
  if (includeInstanceTemplate) {
    includeObject.instanceTemplate = true;
  }
  if (includeInstanceTemplate && includeInstanceTemplateMacros) {
    includeObject.instanceTemplate = { include: { macros: true } };
  }

  const foundMealPrepLogs = await getOrSetCache(req.url, async () => {
    const mealPrepLogs = await MealPrepLogClient.findMany({
      orderBy: orderByObject,
      where: queryObject,
      include: includeObject,
    });
    return mealPrepLogs;
  });

  if (foundMealPrepLogs.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Could not find any meal prep logs!",
      mealPrepLogs: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all meal prep logs!",
    nbHits: foundMealPrepLogs.length,
    mealPrepLogs: foundMealPrepLogs,
  });
};

export default getAllMealPrepLogs;
