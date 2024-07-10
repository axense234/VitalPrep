// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { InstanceTemplateClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetInstanceTemplateByIdQueryObject from "../../core/types/instanceTemplates/GetInstanceTemplateByIdQueryObjectType";
import InstanceTemplatesIncludeObject from "../../core/types/instanceTemplates/InstanceTemplatesIncludeObjectType";

const getInstanceTemplateById = async (req: Request, res: Response) => {
  const { instanceTemplateId } = req.params;
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
    includeMealPrepPlans,
  } = req.query;

  const includeObject: InstanceTemplatesIncludeObject = {};
  const queryObject: GetInstanceTemplateByIdQueryObject = { id: "" };

  if (!instanceTemplateId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter an instance template id!",
      instanceTemplate: {},
    });
  }
  queryObject.id = instanceTemplateId;

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
  if (includeMealPrepPlans) {
    includeObject.mealPrepPlans = true;
  }

  const foundInstanceTemplate = await getOrSetCache(req.url, async () => {
    const instanceTemplate = await InstanceTemplateClient.findUnique({
      where: queryObject,
      include: includeObject,
    });
    return instanceTemplate;
  });

  if (!foundInstanceTemplate) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find any instance templates with id:${instanceTemplateId}...`,
      instanceTemplate: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found instance template with id:${instanceTemplateId}.`,
    instanceTemplate: foundInstanceTemplate,
  });
};

export default getInstanceTemplateById;
