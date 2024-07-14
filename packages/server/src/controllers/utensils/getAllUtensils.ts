// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { UtensilClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetAllUtensilsQueryObject from "../../core/types/utensils/GetAllUtensilsQueryObjectType";
import UtensilsIncludeObject from "../../core/types/utensils/UtensilsIncludeObjectType";
import UtensilsOrderByObject from "../../core/types/utensils/UtensilsOrderByObjectType";

const getAllUtensils = async (req: Request, res: Response) => {
  const {
    userUtensils,
    userId,
    searchByKey,
    searchByValue,
    sortByKey,
    sortByOrder,
    includeUser,
    includeRecipes,
    includeDayTemplates,
    includeInstanceTemplates,
    includeMealPrepPlans,
  } = req.query;

  const queryObject: GetAllUtensilsQueryObject = {};
  const orderByObject: UtensilsOrderByObject = {};
  const includeObject: UtensilsIncludeObject = {};

  // QUERY
  if (userUtensils) {
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

  const foundUtensils = await getOrSetCache(req.url, async () => {
    const utensils = await UtensilClient.findMany({
      orderBy: orderByObject,
      where: queryObject,
      include: includeObject,
    });
    return utensils;
  });

  // INCLUDE
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

  console.log(foundUtensils);

  if (foundUtensils.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Could not find any utensils!", utensils: [] });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all utensils!",
    nbHits: foundUtensils.length,
    utensils: foundUtensils,
  });
};

export default getAllUtensils;
