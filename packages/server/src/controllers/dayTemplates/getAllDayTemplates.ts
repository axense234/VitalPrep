// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { DayTemplateClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetAllDayTemplatesQueryObject from "../../core/types/dayTemplates/GetAllDayTemplatesQueryObjectType";
import DayTemplatesOrderByObject from "../../core/types/dayTemplates/DayTemplatesOrderByObjectType";
import DayTemplatesIncludeObject from "../../core/types/dayTemplates/DayTemplatesIncludeObjectType";

const getAllDayTemplates = async (req: Request, res: Response) => {
  const {
    userDayTemplates,
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
    includeInstanceTemplates,
    includeMealPrepPlans,
  } = req.query;

  const queryObject: GetAllDayTemplatesQueryObject = {};
  const orderByObject: DayTemplatesOrderByObject = {};
  const includeObject: DayTemplatesIncludeObject = {};

  // QUERY
  if (userDayTemplates) {
    queryObject.userId = userId as string;
  }

  if (searchByKey) {
    queryObject[searchByKey as string] = {
      contains: (searchByValue as string) || "",
    };
  }

  // ORDER BY
  if (sortByKey === "numberOfInstanceTemplates") {
    orderByObject.instanceTemplates = { _count: sortByOrder as "asc" | "desc" };
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
  if (includeInstanceTemplates) {
    includeObject.instanceTemplates = true;
  }
  if (includeMealPrepPlans) {
    includeObject.mealPrepPlans = true;
  }

  const foundDayTemplates = await getOrSetCache(req.url, async () => {
    const dayTemplates = await DayTemplateClient.findMany({
      orderBy: orderByObject,
      where: queryObject,
      include: includeObject,
    });
    return dayTemplates;
  });

  if (foundDayTemplates.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Could not find any day templates!", dayTemplates: [] });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all day templates!",
    nbHits: foundDayTemplates.length,
    dayTemplates: foundDayTemplates,
  });
};

export default getAllDayTemplates;
