// Express
import { Response, Request, query } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { IngredientClient } from "../db/postgres";
import { Prisma } from "@prisma/client";
// Utils
import { deleteCache, setCache } from "../utils/redis";

type GetAllIngredientsQueryObject = {
  userId?: string;
  searchByKey?: { contains: string };
};

type GetIngredientByIdQueryObject = {
  id: string;
  macrosId?: string;
};

type IngredientsOrderByObject =
  | ({
      name?: "asc" | "desc";
      recipes?: { _count: string | undefined };
    } & Prisma.IngredientOrderByWithRelationInput)
  | Prisma.IngredientOrderByWithRelationInput[]
  | undefined;

type IngredientsIncludeObject = {
  macros?: boolean;
  user?: boolean;
  recipes?: boolean;
  dayTemplates?: boolean;
  instanceTemplates?: boolean;
  mealPrepPlans?: boolean;
};

const getAllIngredients = async (req: Request, res: Response) => {
  const {
    userIngredients,
    userId,
    searchByKey,
    searchByValue,
    sortByKey,
    sortByOrder,
    includeMacros,
    includeUser,
    includeRecipes,
    includeDayTemplates,
    includeInstanceTemplates,
    includeMealPrepPlans,
  } = req.query;

  const queryObject: GetAllIngredientsQueryObject = {};
  const orderByObject: IngredientsOrderByObject = {};
  const includeObject: IngredientsIncludeObject = {};

  // QUERY
  if (userIngredients) {
    queryObject.userId = userId as string;
  }

  if (searchByKey) {
    queryObject[searchByKey as string] = {
      contains: (searchByValue as string) || "",
    };
  }

  // ORDER BY
  if (sortByKey === "numberOfRecipes") {
    orderByObject.recipes = { _count: sortByOrder as "asc" | "desc" };
  } else if (sortByKey) {
    orderByObject[sortByKey as string] = (sortByOrder as string) || "asc";
  }

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

  const foundIngredients = await IngredientClient.findMany({
    orderBy: orderByObject,
    where: queryObject,
    include: includeObject,
  });

  if (foundIngredients.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Could not find any ingredients!", ingredients: [] });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all ingredients!",
    nbHits: foundIngredients.length,
    ingredients: foundIngredients,
  });
};

const getIngredientById = async (req: Request, res: Response) => {
  const { ingredientId, userId } = req.params;
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

  // QUERY
  if (userId) {
    // queryObject.id = userId;
  }

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

  const foundIngredient = await IngredientClient.findUnique({
    where: queryObject,
    include: includeObject,
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

const createIngredient = async (req: Request, res: Response) => {
  const ingredientBody = req.body;
  const userId = req.query.userId;

  if (!ingredientBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", ingredient: {} });
  }

  if (!ingredientBody.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter the name of the ingredient!",
      ingredient: {},
    });
  }

  if (!ingredientBody.macros) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter the macros of your ingredient!",
      ingredient: {},
    });
  }

  if (userId) {
    ingredientBody.user = { connect: { id: userId } };
  }

  if (!ingredientBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", ingredient: {} });
  }

  delete ingredientBody.macros.id;
  const ingredientMacros = ingredientBody.macros;
  delete ingredientBody.macros;

  const createdIngredient = await IngredientClient.create({
    data: {
      ...ingredientBody,
      macros: {
        create: ingredientMacros,
      },
    },
    include: {
      macros: true,
      recipes: true,
      user: true,
    },
  });

  if (!createdIngredient) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not create ingredient! Verify the request body!",
      ingredient: {},
    });
  }
  await deleteCache(`ingredients`);
  await deleteCache(`${createdIngredient.userId}:ingredients`);

  await setCache(
    `${createdIngredient.userId}:ingredients:${createdIngredient.id}`,
    createdIngredient
  );

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created ingredient with id:${createdIngredient.id}.`,
    ingredient: createdIngredient,
  });
};

const updateIngredient = async (req: Request, res: Response) => {
  const { ingredientId } = req.params;
  const ingredientBody = req.body;

  const { userId, updateIngredientSingle } = req.query;

  if (!ingredientId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an ingredient id!", ingredient: {} });
  }

  if (!ingredientBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", ingredient: {} });
  }

  if (ingredientBody.user || userId) {
    ingredientBody.user = {
      connect: { id: ingredientBody?.user?.id || userId },
    };
    delete ingredientBody?.userId;
  }

  if (ingredientBody.macros) {
    ingredientBody.macros = { update: ingredientBody.macros };
    delete ingredientBody?.macrosId;
  }

  if (updateIngredientSingle) {
    delete ingredientBody?.recipes;
    delete ingredientBody?.dayTemplates;
    delete ingredientBody?.instanceTemplates;
    delete ingredientBody?.mealPrepPlans;
    delete ingredientBody?.mealPrepLogs;
  }

  const updatedIngredient = await IngredientClient.update({
    where: { id: ingredientId },
    data: { ...ingredientBody },
    include: {
      macros: true,
      recipes: true,
      user: true,
    },
  });

  if (!updatedIngredient) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not update ingredient with id:${ingredientId}...`,
      ingredient: {},
    });
  }

  await deleteCache(`ingredients`);
  await deleteCache(`${updatedIngredient.userId}:ingredients`);

  await setCache(
    `${updatedIngredient.userId}:ingredients:${updatedIngredient.id}`,
    updatedIngredient
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated ingredient with id:${ingredientId}.`,
    ingredient: updatedIngredient,
  });
};

const deleteIngredient = async (req: Request, res: Response) => {
  const { ingredientId } = req.params;

  if (!ingredientId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an ingredient id!", ingredient: {} });
  }

  const deletedIngredient = await IngredientClient.delete({
    where: { id: ingredientId },
    include: {
      macros: true,
      recipes: true,
      user: true,
    },
  });

  if (!deletedIngredient) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not delete ingredient with id:${ingredientId}...`,
      ingredient: {},
    });
  }

  await deleteCache(`ingredients`);
  await deleteCache(`${deletedIngredient.userId}:ingredients`);

  await deleteCache(
    `${deletedIngredient.userId}:ingredients:${deletedIngredient.id}`
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted ingredient with id:${ingredientId}.`,
    ingredient: deletedIngredient,
  });
};

export {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
