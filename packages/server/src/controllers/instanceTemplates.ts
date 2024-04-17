// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { DayTemplateClient, InstanceTemplateClient } from "../db/postgres";
import { DayTemplate, InstanceTemplate, Prisma } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

type GetAllInstanceTemplatesQueryObject = {
  userId?: string;
  searchByKey?: { contains: string };
};

type GetInstanceTemplateByIdQueryObject = {
  id: string;
  macrosId?: string;
};

type InstanceTemplatesOrderByObject =
  | ({
      name?: "asc" | "desc";
      coverage?: number;
      mealPrepPlans?: { _count: string | undefined };
    } & Prisma.InstanceTemplateOrderByWithRelationInput)
  | Prisma.InstanceTemplateOrderByWithRelationInput[]
  | undefined;

type InstanceTemplatesIncludeObject = {
  macros?: boolean;
  user?: boolean;
  ingredients?: boolean | { include: { macros: boolean } };
  utensils?: boolean;
  recipes?: boolean | { include: { macros: boolean } };
  dayTemplates?: boolean | { include: { macros: boolean } };
  mealPrepPlans?: boolean;
};

const getAllInstanceTemplates = async (req: Request, res: Response) => {
  const {
    userInstanceTemplates,
    userId,
    searchByKey,
    searchByValue,
    sortByKey,
    sortByOrder,
    includeMacros,
    includeUser,
    includeIngredients,
    includeUtensils,
    includeRecipes,
    includeDayTemplates,
    includeMealPrepPlans,
  } = req.query;

  const queryObject: GetAllInstanceTemplatesQueryObject = {};
  const orderByObject: InstanceTemplatesOrderByObject = {};
  const includeObject: InstanceTemplatesIncludeObject = {};

  // QUERY
  if (userInstanceTemplates) {
    queryObject.userId = userId as string;
  }

  if (searchByKey) {
    queryObject[searchByKey as string] = {
      contains: (searchByValue as string) || "",
    };
  }

  // ORDER BY
  if (sortByKey === "numberOfMealPrepPlans") {
    orderByObject.mealPrepPlans = { _count: sortByOrder as "asc" | "desc" };
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
  if (includeMealPrepPlans) {
    includeObject.mealPrepPlans = true;
  }

  const foundInstanceTemplates = await InstanceTemplateClient.findMany({
    orderBy: orderByObject,
    where: queryObject,
    include: includeObject,
  });

  if (foundInstanceTemplates.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Could not find any instance templates!",
      instanceTemplates: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all instance templates!",
    nbHits: foundInstanceTemplates.length,
    instanceTemplates: foundInstanceTemplates,
  });
};

const getInstanceTemplateById = async (req: Request, res: Response) => {
  const { instanceTemplateId, userId } = req.params;
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

  const foundInstanceTemplate = await InstanceTemplateClient.findUnique({
    where: queryObject,
    include: includeObject,
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

  await deleteCache(`instanceTemplates`);
  await deleteCache(`${createdInstanceTemplate.userId}:instanceTemplates`);

  await setCache(
    `${createdInstanceTemplate.userId}:instanceTemplates:${createdInstanceTemplate.id}`,
    createdInstanceTemplate
  );

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created instance template with id:${createdInstanceTemplate.id}.`,
    instanceTemplate: createdInstanceTemplate,
  });
};

const updateInstanceTemplate = async (req: Request, res: Response) => {
  const { instanceTemplateId } = req.params;
  const instanceTemplateBody = req.body;

  if (!instanceTemplateId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter an instance template id!",
      instanceTemplate: {},
    });
  }

  if (!instanceTemplateBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", instanceTemplate: {} });
  }

  const dayTemplates = instanceTemplateBody.dayTemplates as DayTemplate[];

  const updatedInstanceTemplate = await InstanceTemplateClient.update({
    where: { id: instanceTemplateId },
    data: {
      ...instanceTemplateBody,
      dayTemplates: {
        connect: dayTemplates.map((dayTemplate) => ({ id: dayTemplate.id })),
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

  if (!updatedInstanceTemplate) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not update instance template with id:${instanceTemplateId}...`,
      instanceTemplate: {},
    });
  }

  await deleteCache(`instanceTemplates`);
  await deleteCache(`${updatedInstanceTemplate.userId}:instanceTemplates`);

  await setCache(
    `${updatedInstanceTemplate.userId}:instanceTemplates:${updatedInstanceTemplate.id}`,
    updatedInstanceTemplate
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated instance template with id:${instanceTemplateId}.`,
    instanceTemplate: updatedInstanceTemplate,
  });
};

const deleteInstanceTemplate = async (req: Request, res: Response) => {
  const { instanceTemplateId } = req.params;

  if (!instanceTemplateId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter an instance template id!",
      instanceTemplate: {},
    });
  }

  const deletedInstanceTemplate = await InstanceTemplateClient.delete({
    where: { id: instanceTemplateId },
    include: {
      macros: true,
      dayTemplates: true,
      mealPrepPlans: true,
      mealPrepLogs: true,
      user: true,
    },
  });

  if (!deletedInstanceTemplate) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not delete instance template with id:${instanceTemplateId}...`,
      instanceTemplate: {},
    });
  }

  await deleteCache(`instanceTemplates`);
  await deleteCache(`${deletedInstanceTemplate.userId}:instanceTemplates`);

  await deleteCache(
    `${deletedInstanceTemplate.userId}:instanceTemplates:${deletedInstanceTemplate.id}`
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted instance template with id:${instanceTemplateId}.`,
    instanceTemplate: deletedInstanceTemplate,
  });
};

export {
  getAllInstanceTemplates,
  getInstanceTemplateById,
  createInstanceTemplate,
  updateInstanceTemplate,
  deleteInstanceTemplate,
};
