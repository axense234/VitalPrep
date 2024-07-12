// Express
import { Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
// Prisma
import { UserClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import UsersIncludeObject from "../../core/types/users/UsersIncludeObjectType";

const getUserById = async (req: Request, res: Response) => {
  const userIdParams = req.params.userId;
  const userIdCache = req?.user?.userId;
  const {
    includeIngredients,
    includeIngredientsMacros,
    includeUtensils,
    includeRecipes,
    includeRecipesMacros,
    includeDayTemplates,
    includeDayTemplatesMacros,
    includeInstanceTemplates,
    includeInstanceTemplatesMacros,
    includeMealPrepPlans,
    includeMealPrepPlansMacros,
    includeMealPrepLogs,
    includeNotificationSettings,
  } = req.query;

  const userId = userIdCache || userIdParams;
  const includeObject: UsersIncludeObject = {};

  if (!userId || userId === "null" || userId === "undefined") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an user id!", user: {} });
  }

  // INCLUDE
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
  if (includeInstanceTemplates) {
    includeObject.instanceTemplates = true;
  }
  if (includeInstanceTemplates && includeInstanceTemplatesMacros) {
    includeObject.instanceTemplates = { include: { macros: true } };
  }
  if (includeMealPrepPlans) {
    includeObject.mealPrepPlans = true;
  }
  if (includeMealPrepPlans && includeMealPrepPlansMacros) {
    includeObject.mealPrepPlans = { include: { macros: true } };
  }
  if (includeMealPrepLogs) {
    includeObject.mealPrepLogs = true;
  }
  if (includeNotificationSettings) {
    includeObject.notificationSettings = true;
  }

  const foundUser = await getOrSetCache(req.url, async () => {
    const user = await UserClient.findUnique({
      where: { id: userId },
      include: includeObject,
    });
    return user;
  });

  if (!foundUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find user with id:${userId}...`,
      user: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found user with id:${userId}.`,
    user: foundUser,
  });
};

export default getUserById;
