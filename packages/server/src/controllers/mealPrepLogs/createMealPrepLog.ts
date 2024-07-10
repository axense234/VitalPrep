// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { InstanceTemplateClient, MealPrepLogClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const createMealPrepLog = async (req: Request, res: Response) => {
  const mealPrepLogBody = req.body;
  const userId = req.query.userId;

  if (userId) {
    mealPrepLogBody.user = { connect: { id: userId } };
  }

  if (!mealPrepLogBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", mealPrepLog: {} });
  }

  if (!mealPrepLogBody.instanceTemplateId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Cannot create Meal Prep Log without a Instance Template!",
      mealPrepLog: {},
    });
  }

  if (!mealPrepLogBody.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter a Meal Prep Log name!",
      mealPrepLog: {},
    });
  }

  if (mealPrepLogBody.cookingDuration <= 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid cooking duration!",
      mealPrepLog: {},
    });
  }

  if (mealPrepLogBody.macros) {
    delete mealPrepLogBody.macros;
  }

  const instanceTemplateId = mealPrepLogBody.instanceTemplateId;
  delete mealPrepLogBody.instanceTemplateId;

  const foundInstanceTemplate = await InstanceTemplateClient.findUnique({
    where: { id: instanceTemplateId },
    include: {
      macros: true,
      ingredients: true,
      utensils: true,
      recipes: true,
      dayTemplates: true,
    },
  });

  if (!foundInstanceTemplate) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not find the Instance Templates with the given id!",
      instanceTemplate: {},
    });
  }

  const ingredientsIds = foundInstanceTemplate.ingredients.map(
    (ingredient) => ingredient.id
  );
  const utensilsIds = foundInstanceTemplate.utensils.map(
    (utensil) => utensil.id
  );
  const recipesIds = foundInstanceTemplate.recipes.map((recipe) => recipe.id);
  const dayTemplatesIds = foundInstanceTemplate.dayTemplates.map(
    (dayTemplate) => dayTemplate.id
  );

  const createdMealPrepLog = await MealPrepLogClient.create({
    data: {
      ...mealPrepLogBody,
      instanceTemplate: {
        connect: { id: instanceTemplateId },
      },
      ingredients: {
        connect: ingredientsIds.map((ingredientId) => ({
          id: ingredientId,
        })),
      },
      utensils: {
        connect: utensilsIds.map((utensilsId) => ({
          id: utensilsId,
        })),
      },
      recipes: {
        connect: recipesIds.map((recipesId) => ({
          id: recipesId,
        })),
      },
      dayTemplates: {
        connect: dayTemplatesIds.map((dayTemplatesId) => ({
          id: dayTemplatesId,
        })),
      },
    },
    include: {
      instanceTemplate: true,
      user: true,
    },
  });

  if (!createdMealPrepLog) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not create meal prep log! Verify the request body!",
      mealPrepLog: {},
    });
  }

  await handleCacheMutation("mealPrepLogs", userId as string);

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created meal prep log with id:${createdMealPrepLog.id}.`,
    mealPrepLog: createdMealPrepLog,
  });
};

export default createMealPrepLog;
