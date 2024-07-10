// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { InstanceTemplateClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetAllInstanceTemplatesQueryObject from "../../core/types/instanceTemplates/GetAllInstanceTemplatesQueryObjectType";
import InstanceTemplatesIncludeObject from "../../core/types/instanceTemplates/InstanceTemplatesIncludeObjectType";
import InstanceTemplatesOrderByObject from "../../core/types/instanceTemplates/InstanceTemplatesOrderByObjectType";

const getAllInstanceTemplates = async (req: Request, res: Response) => {
  const {
    userInstanceTemplates,
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
    includeMealPrepPlans,
  } = req.query;

  const queryObject: GetAllInstanceTemplatesQueryObject = {};
  const orderByObject: InstanceTemplatesOrderByObject = {};
  const includeObject: InstanceTemplatesIncludeObject = {};

  // QUERY
  if (userInstanceTemplates) {
    queryObject.userId = userId as string;
  }

  if (searchByKey) {
    queryObject[searchByKey as string] = {
      contains: (searchByValue as string) || "",
    };
  }

  // ORDER BY
  if (sortByKey === "numberOfMealPrepPlans") {
    orderByObject.mealPrepPlans = { _count: sortByOrder as "asc" | "desc" };
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
  if (includeRecipes) {
    includeObject.recipes = true;
  }
  if (includeDayTemplates) {
    includeObject.dayTemplates = true;
  }
  if (includeMealPrepPlans) {
    includeObject.mealPrepPlans = true;
  }

  const foundInstanceTemplates = await getOrSetCache(req.url, async () => {
    const instanceTemplates = await InstanceTemplateClient.findMany({
      orderBy: orderByObject,
      where: queryObject,
      include: includeObject,
    });
    return instanceTemplates;
  });

  if (foundInstanceTemplates.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Could not find any instance templates!",
      instanceTemplates: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all instance templates!",
    nbHits: foundInstanceTemplates.length,
    instanceTemplates: foundInstanceTemplates,
  });
};

export default getAllInstanceTemplates;
