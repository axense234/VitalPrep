// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { IngredientClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";
// Types
import GetIngredientByIdQueryObject from "../../core/types/ingredients/GetIngredientByIdQueryObjectType";
import IngredientsIncludeObject from "../../core/types/ingredients/IngredientsIncludeObjectType";

const getIngredientById = async (req: Request, res: Response) => {
  const { ingredientId } = req.params;
  const {
    includeMacros,
    includeUser,
    includeRecipes,
    includeDayTemplates,
    includeInstanceTemplates,
    includeMealPrepPlans,
  } = req.query;

  const includeObject: IngredientsIncludeObject = {};
  const queryObject: GetIngredientByIdQueryObject = { id: "" };

  if (!ingredientId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an ingredient id!", ingredient: {} });
  }
  queryObject.id = ingredientId;

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

  const foundIngredient = await getOrSetCache(req.url, async () => {
    const ingredient = await IngredientClient.findUnique({
      where: queryObject,
      include: includeObject,
    });
    return ingredient;
  });

  if (!foundIngredient) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find any ingredients with id:${ingredientId}...`,
      ingredient: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found ingredient with id:${ingredientId}.`,
    ingredient: foundIngredient,
  });
};

export default getIngredientById;
