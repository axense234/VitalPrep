// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { MealPrepPlanClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetAllMealPrepPlansQueryObject from "../../core/types/mealPrepPlans/GetAllMealPrepPlansQueryObjectType";
import MealPrepPlansIncludeObject from "../../core/types/mealPrepPlans/MealPrepPlansIncludeObjectType";
import MealPrepPlansOrderByObject from "../../core/types/mealPrepPlans/MealPrepPlansOrderByObjectType";

const getAllMealPrepPlans = async (req: Request, res: Response) => {
  const {
    userMealPrepPlans,
    userId,
    searchByKey,
    searchByValue,
    sortByKey,
    sortByOrder,
    includeMacros,
    includeUser,
    includeIngredients,
    includeUtensils,
    includeRecipes,
    includeDayTemplates,
    includeInstanceTemplates,
  } = req.query;

  const queryObject: GetAllMealPrepPlansQueryObject = {};
  const orderByObject: MealPrepPlansOrderByObject = {};
  const includeObject: MealPrepPlansIncludeObject = {};

  // QUERY
  if (userMealPrepPlans) {
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
  if (includeRecipes) {
    includeObject.recipes = true;
  }
  if (includeDayTemplates) {
    includeObject.dayTemplates = true;
  }
  if (includeInstanceTemplates) {
    includeObject.instanceTemplates = true;
  }

  const foundMealPrepPlans = await getOrSetCache(req.url, async () => {
    const mealPrepPlans = await MealPrepPlanClient.findMany({
      orderBy: orderByObject,
      where: queryObject,
      include: includeObject,
    });
    return mealPrepPlans;
  });

  if (foundMealPrepPlans.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Could not find any meal prep plans!",
      mealPrepPlans: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all meal prep plans!",
    nbHits: foundMealPrepPlans.length,
    mealPrepPlans: foundMealPrepPlans,
  });
};

export default getAllMealPrepPlans;
