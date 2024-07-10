// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { DayTemplateClient, RecipeClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const createDayTemplate = async (req: Request, res: Response) => {
  const dayTemplateBody = req.body;
  const userId = req.query.userId;

  if (userId) {
    dayTemplateBody.user = { connect: { id: userId } };
  }

  if (!dayTemplateBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", dayTemplate: {} });
  }

  if (!dayTemplateBody.name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a day template name!", dayTemplate: {} });
  }

  if (!dayTemplateBody.recipes) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Cannot create day template without any recipes!",
      dayTemplate: {},
    });
  }

  const recipesIds = dayTemplateBody.recipes as string[];

  const foundRecipes = await RecipeClient.findMany({
    where: { id: { in: recipesIds } },
    include: { macros: true, ingredients: true, utensils: true },
  });

  if (foundRecipes.length < 1) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not find the recipes with the given ids!",
      recipes: [],
    });
  }

  const ingredientsIds = foundRecipes
    .map((recipe) => recipe.ingredients.map((ingredient) => ingredient.id))
    .flat();

  const utensilsIds = foundRecipes
    .map((recipe) => recipe.utensils.map((utensil) => utensil.id))
    .flat();

  let dayTemplateMacros = {
    calories: 0,
    carbsAmount: 0,
    fatsAmount: 0,
    proteinAmount: 0,
  };

  foundRecipes.forEach((recipe) => {
    dayTemplateMacros.calories += recipe.macros.calories;
    dayTemplateMacros.proteinAmount += recipe.macros.proteinAmount;
    dayTemplateMacros.carbsAmount += recipe.macros.carbsAmount;
    dayTemplateMacros.fatsAmount += recipe.macros.fatsAmount;
  });

  const createdDayTemplate = await DayTemplateClient.create({
    data: {
      ...dayTemplateBody,
      recipes: {
        connect: recipesIds.map((recipe) => ({
          id: recipe,
        })),
      },
      ingredients: {
        connect: ingredientsIds.map((ingredient) => ({
          id: ingredient,
        })),
      },
      utensils: {
        connect: utensilsIds.map((utensil) => ({
          id: utensil,
        })),
      },
      macros: {
        create: dayTemplateMacros,
      },
    },
    include: {
      macros: true,
      recipes: true,
      instanceTemplates: true,
      user: true,
    },
  });

  if (!createdDayTemplate) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not create day template! Verify the request body!",
      dayTemplate: {},
    });
  }

  await handleCacheMutation("dayTemplates", userId as string);

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created day template with id:${createdDayTemplate.id}.`,
    dayTemplate: createdDayTemplate,
  });
};

export default createDayTemplate;
