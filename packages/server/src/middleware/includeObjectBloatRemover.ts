// Express
import { NextFunction, Request, Response } from "express";

const includeObjectBloatRemover = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    includeMacros,
    includeUser,
    includeNotificationSettings,
    includeIngredients,
    includeIngredientsMacros,
    includeUtensils,
    includeRecipes,
    includeRecipeTutorial,
    includeRecipesMacros,
    includeDayTemplates,
    includeDayTemplatesMacros,
    includeDayTemplatesRecipes,
    includeInstanceTemplate,
    includeInstanceTemplateMacros,
    includeInstanceTemplates,
    includeInstanceTemplatesDayTemplates,
    includeInstanceTemplatesMacros,
    includeInstanceTemplatesTimings,
    includeMealPrepPlans,
    includeMealPrepPlansMacros,
    includeMealPrepPlansInstanceTemplates,
    includeMealPrepLogs,
  } = req.query;

  next();
};

export default includeObjectBloatRemover;
