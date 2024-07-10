// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { DayTemplateClient, InstanceTemplateClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const createInstanceTemplate = async (req: Request, res: Response) => {
  const instanceTemplateBody = req.body;
  const userId = req.query.userId;

  if (userId) {
    instanceTemplateBody.user = { connect: { id: userId } };
  }

  if (!instanceTemplateBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", instanceTemplate: {} });
  }

  if (!instanceTemplateBody.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter an instance template name!",
      instanceTemplate: {},
    });
  }

  if (!instanceTemplateBody.dayTemplates) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Cannot create instance template without any day templates!",
      instanceTemplate: {},
    });
  }

  const dayTemplatesIds = instanceTemplateBody.dayTemplates as string[];

  const foundDayTemplates = await DayTemplateClient.findMany({
    where: { id: { in: dayTemplatesIds } },
    include: { macros: true, ingredients: true, utensils: true, recipes: true },
  });

  if (foundDayTemplates.length < 1) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not find the day templates with the given ids!",
      dayTemplates: [],
    });
  }

  const ingredientsIds = foundDayTemplates
    .map((dayTemplate) =>
      dayTemplate.ingredients.map((ingredient) => ingredient.id)
    )
    .flat();

  const utensilsIds = foundDayTemplates
    .map((dayTemplate) => dayTemplate.utensils.map((utensil) => utensil.id))
    .flat();

  const recipesIds = foundDayTemplates
    .map((dayTemplate) => dayTemplate.recipes.map((recipe) => recipe.id))
    .flat();

  let instanceTemplateMacros = {
    calories: 0,
    carbsAmount: 0,
    fatsAmount: 0,
    proteinAmount: 0,
  };

  foundDayTemplates.forEach((dayTemplate) => {
    instanceTemplateMacros.calories += dayTemplate.macros.calories;
    instanceTemplateMacros.proteinAmount += dayTemplate.macros.calories;
    instanceTemplateMacros.carbsAmount += dayTemplate.macros.carbsAmount;
    instanceTemplateMacros.fatsAmount += dayTemplate.macros.fatsAmount;
  });

  const createdInstanceTemplate = await InstanceTemplateClient.create({
    data: {
      ...instanceTemplateBody,
      dayTemplates: {
        connect: dayTemplatesIds.map((dayTemplate) => ({
          id: dayTemplate,
        })),
      },
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
        create: instanceTemplateMacros,
      },
    },
    include: {
      macros: true,
      dayTemplates: true,
      mealPrepPlans: true,
      mealPrepLogs: true,
      user: true,
    },
  });

  if (!createdInstanceTemplate) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not create instance template! Verify the request body!",
      instanceTemplate: {},
    });
  }

  await handleCacheMutation("instanceTemplates", userId as string);

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created instance template with id:${createdInstanceTemplate.id}.`,
    instanceTemplate: createdInstanceTemplate,
  });
};

export default createInstanceTemplate;
