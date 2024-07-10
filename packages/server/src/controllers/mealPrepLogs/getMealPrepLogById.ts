// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { MealPrepLogClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetMealPrepLogByIdQueryObject from "../../core/types/mealPrepLogs/GetMealPrepLogByIdQueryObjectType";
import MealPrepLogsIncludeObject from "../../core/types/mealPrepLogs/MealPrepLogsIncludeObjectType";

const getMealPrepLogById = async (req: Request, res: Response) => {
  const { mealPrepLogId } = req.params;
  const {
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

  const includeObject: MealPrepLogsIncludeObject = {};
  const queryObject: GetMealPrepLogByIdQueryObject = { id: "" };

  if (!mealPrepLogId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a meal prep log id!", mealPrepLog: {} });
  }
  queryObject.id = mealPrepLogId;

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

  const foundMealPrepLog = await getOrSetCache(req.url, async () => {
    const mealPrepLog = await MealPrepLogClient.findUnique({
      where: queryObject,
      include: includeObject,
    });
    return mealPrepLog;
  });

  if (!foundMealPrepLog) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find any meal prep logs with id:${mealPrepLogId}...`,
      mealPrepLog: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found meal prep log with id:${mealPrepLogId}.`,
    mealPrepLog: foundMealPrepLog,
  });
};

export default getMealPrepLogById;
