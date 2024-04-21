// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { InstanceTemplateClient, MealPrepLogClient } from "../db/postgres";
import { InstanceTemplate, MealPrepLog, Prisma } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

type GetAllMealPrepLogsQueryObject = {
  userId?: string;
  searchByKey?: { contains: string };
};

type GetMealPrepLogByIdQueryObject = {
  id: string;
};

type MealPrepLogsOrderByObject =
  | ({
      name?: "asc" | "desc";
      completed?: "asc" | "desc";
    } & Prisma.MealPrepLogOrderByWithRelationInput)
  | Prisma.MealPrepLogOrderByWithRelationInput[]
  | undefined;

type MealPrepLogsIncludeObject = {
  macros?: boolean;
  user?: boolean;
  ingredients?: boolean | { include: { macros: boolean } };
  utensils?: boolean;
  recipes?: boolean | { include: { macros: boolean } };
  dayTemplates?: boolean | { include: { macros: boolean } };
  instanceTemplate?: boolean | { include: { macros: boolean } };
};

const getAllMealPrepLogs = async (req: Request, res: Response) => {
  const {
    userMealPrepLogs,
    userId,
    searchByKey,
    searchByValue,
    sortByKey,
    sortByOrder,
    includeUser,
    includeIngredients,
    includeUtensils,
    includeRecipes,
    includeDayTemplates,
  } = req.query;

  const queryObject: GetAllMealPrepLogsQueryObject = {};
  const orderByObject: MealPrepLogsOrderByObject = {};
  const includeObject: MealPrepLogsIncludeObject = {};

  // QUERY
  if (userMealPrepLogs) {
    queryObject.userId = userId as string;
  }

  if (searchByKey) {
    queryObject[searchByKey as string] = {
      contains: (searchByValue as string) || "",
    };
  }

  // ORDER BY
  if (sortByKey) {
    orderByObject[sortByKey as string] = (sortByOrder as string) || "asc";
  }

  // INCLUDE
  if (includeUser) {
    includeObject.user = true;
  }
  if (includeIngredients) {
    includeObject.ingredients = true;
  }
  if (includeUtensils) {
    includeObject.utensils = true;
  }
  if (includeRecipes) {
    includeObject.recipes = true;
  }
  if (includeDayTemplates) {
    includeObject.dayTemplates = true;
  }

  const foundMealPrepLogs = await MealPrepLogClient.findMany({
    orderBy: orderByObject,
    where: queryObject,
    include: includeObject,
  });

  if (foundMealPrepLogs.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Could not find any meal prep logs!",
      mealPrepLogs: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all meal prep logs!",
    nbHits: foundMealPrepLogs.length,
    mealPrepLogs: foundMealPrepLogs,
  });
};

const getMealPrepLogById = async (req: Request, res: Response) => {
  const { mealPrepLogId, userId } = req.params;
  const {
    includeUser,
    includeIngredients,
    includeIngredientsMacros,
    includeUtensils,
    includeRecipes,
    includeRecipesMacros,
    includeDayTemplates,
    includeDayTemplatesMacros,
    includeInstanceTemplate,
    includeInstanceTemplateMacros,
  } = req.query;

  const includeObject: MealPrepLogsIncludeObject = {};
  const queryObject: GetMealPrepLogByIdQueryObject = { id: "" };

  if (!mealPrepLogId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a meal prep log id!", mealPrepLog: {} });
  }
  queryObject.id = mealPrepLogId;

  // INCLUDE
  if (includeUser) {
    includeObject.user = true;
  }
  if (includeIngredients) {
    includeObject.ingredients = true;
  }
  if (includeIngredients && includeIngredientsMacros) {
    includeObject.ingredients = { include: { macros: true } };
  }
  if (includeUtensils) {
    includeObject.utensils = true;
  }
  if (includeRecipes) {
    includeObject.recipes = true;
  }
  if (includeRecipes && includeRecipesMacros) {
    includeObject.recipes = { include: { macros: true } };
  }
  if (includeDayTemplates) {
    includeObject.dayTemplates = true;
  }
  if (includeDayTemplates && includeDayTemplatesMacros) {
    includeObject.dayTemplates = { include: { macros: true } };
  }
  if (includeInstanceTemplate) {
    includeObject.instanceTemplate = true;
  }
  if (includeInstanceTemplate && includeInstanceTemplateMacros) {
    includeObject.instanceTemplate = { include: { macros: true } };
  }

  const foundMealPrepLog = await MealPrepLogClient.findUnique({
    where: queryObject,
    include: includeObject,
  });

  if (!foundMealPrepLog) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find any meal prep logs with id:${mealPrepLogId}...`,
      mealPrepLog: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found meal prep log with id:${mealPrepLogId}.`,
    mealPrepLog: foundMealPrepLog,
  });
};

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

  await deleteCache(`mealPrepLogs`);
  await deleteCache(`${createdMealPrepLog.userId}:mealPrepLogs`);

  await setCache(
    `${createdMealPrepLog.userId}:mealPrepLogs:${createdMealPrepLog.id}`,
    createdMealPrepLog
  );

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created meal prep log with id:${createdMealPrepLog.id}.`,
    mealPrepLog: createdMealPrepLog,
  });
};

const updateMealPrepLog = async (req: Request, res: Response) => {
  const { mealPrepLogId } = req.params;
  const mealPrepLogBody = req.body;

  if (!mealPrepLogId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a meal prep log id!", mealPrepLog: {} });
  }

  if (!mealPrepLogBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", mealPrepLog: {} });
  }

  const instanceTemplate = mealPrepLogBody.instanceTemplate as InstanceTemplate;

  const updatedMealPrepLog = await MealPrepLogClient.update({
    where: { id: mealPrepLogId },
    data: {
      ...mealPrepLogBody,
      instanceTemplate: {
        connect: { id: instanceTemplate.id },
      },
    },
    include: {
      instanceTemplate: true,
      user: true,
    },
  });

  if (!updatedMealPrepLog) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not update meal prep log with id:${mealPrepLogId}...`,
      mealPrepLog: {},
    });
  }

  await deleteCache(`mealPrepLogs`);
  await deleteCache(`${updatedMealPrepLog.userId}:mealPrepLogs`);

  await setCache(
    `${updatedMealPrepLog.userId}:mealPrepLogs:${updatedMealPrepLog.id}`,
    updatedMealPrepLog
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated meal prep log with id:${mealPrepLogId}.`,
    mealPrepLog: updatedMealPrepLog,
  });
};

const deleteMealPrepLog = async (req: Request, res: Response) => {
  const { mealPrepLogId } = req.params;

  if (!mealPrepLogId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a meal prep log id!", mealPrepLog: {} });
  }

  const deletedMealPrepLog = await MealPrepLogClient.delete({
    where: { id: mealPrepLogId },
    include: {
      instanceTemplate: true,
      user: true,
    },
  });

  if (!deletedMealPrepLog) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not delete meal prep log with id:${mealPrepLogId}...`,
      mealPrepLog: {},
    });
  }

  await deleteCache(`mealPrepLogs`);
  await deleteCache(`${deletedMealPrepLog.userId}:mealPrepLogs`);

  await deleteCache(
    `${deletedMealPrepLog.userId}:mealPrepLogs:${deletedMealPrepLog.id}`
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted meal prep log with id:${mealPrepLogId}.`,
    mealPrepLog: deletedMealPrepLog,
  });
};

export {
  getAllMealPrepLogs,
  getMealPrepLogById,
  createMealPrepLog,
  updateMealPrepLog,
  deleteMealPrepLog,
};
