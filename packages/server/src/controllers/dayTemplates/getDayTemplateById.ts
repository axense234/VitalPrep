// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { DayTemplateClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetDayTemplateByIdQueryObject from "../../core/types/dayTemplates/GetDayTemplateByIdQueryObjectType";
import DayTemplatesIncludeObject from "../../core/types/dayTemplates/DayTemplatesIncludeObjectType";

const getDayTemplateById = async (req: Request, res: Response) => {
  const { dayTemplateId } = req.params;
  const {
    includeMacros,
    includeUser,
    includeIngredients,
    includeIngredientsMacros,
    includeUtensils,
    includeRecipes,
    includeRecipesMacros,
    includeInstanceTemplates,
    includeInstanceTemplatesDayTemplates,
    includeMealPrepPlans,
    includeMealPrepPlansInstanceTemplates,
  } = req.query;

  const includeObject: DayTemplatesIncludeObject = {};
  const queryObject: GetDayTemplateByIdQueryObject = { id: "" };

  if (!dayTemplateId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a day template id!", dayTemplate: {} });
  }
  queryObject.id = dayTemplateId;

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
  if (includeInstanceTemplates) {
    includeObject.instanceTemplates = true;
  }
  if (includeInstanceTemplates && includeInstanceTemplatesDayTemplates) {
    includeObject.instanceTemplates = {
      include: {
        ...(
          includeObject.instanceTemplates as {
            include: {
              macros?: boolean | undefined;
              dayTemplates?: boolean | undefined;
            };
          }
        ).include,
        dayTemplates: true,
      },
    };
  }
  if (includeMealPrepPlans) {
    includeObject.mealPrepPlans = true;
  }
  if (includeMealPrepPlans && includeMealPrepPlansInstanceTemplates) {
    includeObject.mealPrepPlans = {
      include: {
        ...(
          includeObject.mealPrepPlans as {
            include: {
              macros?: boolean | undefined;
              dayTemplates?: boolean | undefined;
            };
          }
        ).include,
        instanceTemplates: true,
      },
    };
  }

  const foundDayTemplate = await getOrSetCache(req.url, async () => {
    const dayTemplate = await DayTemplateClient.findUnique({
      where: queryObject,
      include: includeObject,
    });
    return dayTemplate;
  });

  if (!foundDayTemplate) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find any day templates with id:${dayTemplateId}...`,
      dayTemplate: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found day template with id:${dayTemplateId}.`,
    dayTemplate: foundDayTemplate,
  });
};

export default getDayTemplateById;
