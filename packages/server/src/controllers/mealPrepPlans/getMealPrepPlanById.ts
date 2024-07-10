// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { MealPrepPlanClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetMealPrepPlanByIdQueryObject from "../../core/types/mealPrepPlans/GetMealPrepPlanByIdQueryObjectType";
import MealPrepPlansIncludeObject from "../../core/types/mealPrepPlans/MealPrepPlansIncludeObjectType";

const getMealPrepPlanById = async (req: Request, res: Response) => {
  const { mealPrepPlanId } = req.params;
  const {
    includeMacros,
    includeUser,
    includeIngredients,
    includeIngredientsMacros,
    includeUtensils,
    includeRecipes,
    includeRecipesMacros,
    includeDayTemplates,
    includeDayTemplatesMacros,
    includeInstanceTemplates,
    includeInstanceTemplatesMacros,
    includeInstanceTemplatesTimings,
  } = req.query;

  const includeObject: MealPrepPlansIncludeObject = {};
  const queryObject: GetMealPrepPlanByIdQueryObject = { id: "" };

  if (!mealPrepPlanId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a meal prep plan id!", mealPrepPlan: {} });
  }
  queryObject.id = mealPrepPlanId;

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
  if (includeIngredientsMacros && includeIngredients) {
    includeObject.ingredients = { include: { macros: true } };
  }
  if (includeUtensils) {
    includeObject.utensils = true;
  }
  if (includeRecipes) {
    includeObject.recipes = true;
  }
  if (includeRecipesMacros && includeRecipes) {
    includeObject.recipes = { include: { macros: true } };
  }
  if (includeDayTemplates) {
    includeObject.dayTemplates = true;
  }
  if (includeDayTemplatesMacros && includeDayTemplates) {
    includeObject.dayTemplates = { include: { macros: true } };
  }
  if (includeInstanceTemplates) {
    includeObject.instanceTemplates = true;
  }
  if (includeInstanceTemplatesMacros && includeInstanceTemplates) {
    includeObject.instanceTemplates = { include: { macros: true } };
  }
  if (includeInstanceTemplatesTimings) {
    includeObject.instanceTemplatesTimings = true;
  }

  const foundMealPrepPlan = await getOrSetCache(req.url, async () => {
    const mealPrepPlan = await MealPrepPlanClient.findUnique({
      where: queryObject,
      include: includeObject,
    });
    return mealPrepPlan;
  });

  if (!foundMealPrepPlan) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find any meal prep plans with id:${mealPrepPlanId}...`,
      mealPrepPlan: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found meal prep plan with id:${mealPrepPlanId}.`,
    mealPrepPlan: foundMealPrepPlan,
  });
};

export default getMealPrepPlanById;
