// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { UtensilClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetUtensilByIdQueryObject from "../../core/types/utensils/GetUtensilByIdQueryObjectType";
import UtensilsIncludeObject from "../../core/types/utensils/UtensilsIncludeObjectType";

const getUtensilById = async (req: Request, res: Response) => {
  const { utensilId } = req.params;
  const {
    includeMacros,
    includeUser,
    includeRecipes,
    includeDayTemplates,
    includeInstanceTemplates,
    includeMealPrepPlans,
  } = req.query;
  const includeObject: UtensilsIncludeObject = {};
  const queryObject: GetUtensilByIdQueryObject = { id: "" };

  if (!utensilId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an utensil id!", utensil: {} });
  }
  queryObject.id = utensilId;

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

  const foundUtensil = await getOrSetCache(req.url, async () => {
    const utensil = await UtensilClient.findUnique({
      where: queryObject,
      include: includeObject,
    });
    return utensil;
  });

  if (!foundUtensil) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find any utensils with id:${utensilId}...`,
      utensil: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found utensil with id:${utensilId}.`,
    utensil: foundUtensil,
  });
};

export default getUtensilById;
