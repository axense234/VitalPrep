// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { InstanceTemplateClient, MealPrepPlanClient } from "../../db/postgres";
import { MealPrepPlanTiming } from "@prisma/client";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const createMealPrepPlan = async (req: Request, res: Response) => {
  const mealPrepPlanBody = req.body;
  const userId = req.query.userId;

  if (userId) {
    mealPrepPlanBody.user = { connect: { id: userId } };
  }

  if (!mealPrepPlanBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", mealPrepPlan: {} });
  }

  if (!mealPrepPlanBody.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter a meal prep plan name!",
      mealPrepPlan: {},
    });
  }

  if (!mealPrepPlanBody.instanceTemplates) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Cannot create meal prep plan without any instance templates!",
      mealPrepPlan: {},
    });
  }

  if (mealPrepPlanBody.instanceTemplatesTimings.length < 1) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid instance templates timings!",
      mealPrepPlan: {},
    });
  }

  const instanceTemplatesTimingsFromRequestBody =
    mealPrepPlanBody.instanceTemplatesTimings as MealPrepPlanTiming[];
  delete mealPrepPlanBody.instanceTemplatesTimings;

  instanceTemplatesTimingsFromRequestBody.forEach((instanceTemplateTiming) => {
    if (!instanceTemplateTiming?.sessionStartingTime) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please choose appropiate times for the instance timings!",
        mealPrepPlan: {},
      });
    }
  });

  const instanceTemplatesIds = mealPrepPlanBody.instanceTemplates as string[];

  const foundInstanceTemplates = await InstanceTemplateClient.findMany({
    where: { id: { in: instanceTemplatesIds } },
    include: {
      macros: true,
      ingredients: true,
      utensils: true,
      recipes: true,
      dayTemplates: true,
    },
  });

  if (foundInstanceTemplates.length < 1) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not find the instance templates with the given ids!",
      instanceTemplates: [],
    });
  }

  const ingredientsIds = foundInstanceTemplates
    .map((instanceTemplate) =>
      instanceTemplate.ingredients.map((ingredient) => ingredient.id)
    )
    .flat();
  const utensilsIds = foundInstanceTemplates
    .map((instanceTemplate) =>
      instanceTemplate.utensils.map((utensil) => utensil.id)
    )
    .flat();
  const recipesIds = foundInstanceTemplates
    .map((instanceTemplate) =>
      instanceTemplate.recipes.map((recipe) => recipe.id)
    )
    .flat();
  const dayTemplatesIds = foundInstanceTemplates
    .map((instanceTemplate) =>
      instanceTemplate.dayTemplates.map((dayTemplate) => dayTemplate.id)
    )
    .flat();

  let mealPrepPlanMacros = {
    calories: 0,
    carbsAmount: 0,
    fatsAmount: 0,
    proteinAmount: 0,
  };

  foundInstanceTemplates.forEach((instanceTemplate) => {
    mealPrepPlanMacros.calories += instanceTemplate.macros.calories;
    mealPrepPlanMacros.proteinAmount += instanceTemplate.macros.proteinAmount;
    mealPrepPlanMacros.carbsAmount += instanceTemplate.macros.carbsAmount;
    mealPrepPlanMacros.fatsAmount += instanceTemplate.macros.fatsAmount;
  });

  const createdMealPrepPlan = await MealPrepPlanClient.create({
    data: {
      ...mealPrepPlanBody,
      instanceTemplatesTimings: {
        createMany: { data: instanceTemplatesTimingsFromRequestBody },
      },
      instanceTemplates: {
        connect: instanceTemplatesIds.map((instanceTemplate) => ({
          id: instanceTemplate,
        })),
      },
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
        create: mealPrepPlanMacros,
      },
    },
    include: {
      macros: true,
      instanceTemplates: true,
      instanceTemplatesTimings: true,
      user: true,
    },
  });

  if (!createdMealPrepPlan) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not create meal prep plan! Verify the request body!",
      mealPrepPlan: {},
    });
  }

  await handleCacheMutation("mealPrepPlans", userId as string);

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created meal prep plan with id:${createdMealPrepPlan.id}.`,
    mealPrepPlan: createdMealPrepPlan,
  });
};

export default createMealPrepPlan;
