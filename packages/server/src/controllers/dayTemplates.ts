// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { DayTemplateClient, RecipeClient } from "../db/postgres";
import { DayTemplate, Recipe } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

type DayTemplateQueryObject = {
  userId?: string;
};

const getAllDayTemplates = async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const getAllUserDayTemplates = req.query.userDayTemplates;

  const queryObject: DayTemplateQueryObject = {};

  if (getAllUserDayTemplates) {
    queryObject.userId = userId as string;
  }

  const foundDayTemplates = await getOrSetCache("dayTemplates", async () => {
    const dayTemplates = await DayTemplateClient.findMany({
      where: queryObject,
      include: {
        macros: true,
        recipes: true,
        instanceTemplates: true,
        user: true,
      },
    });
    return dayTemplates as DayTemplate[];
  });

  if (foundDayTemplates.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Could not find any day templates!", dayTemplates: [] });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all day templates!",
    nbHits: foundDayTemplates.length,
    dayTemplates: foundDayTemplates,
  });
};

const getDayTemplateById = async (req: Request, res: Response) => {
  const { dayTemplateId, userId } = req.params;

  if (!dayTemplateId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a day template id!", dayTemplate: {} });
  }

  const foundDayTemplate = await getOrSetCache(
    `${userId}:dayTemplates:${dayTemplateId}`,
    async () => {
      const dayTemplate = await DayTemplateClient.findUnique({
        where: { id: dayTemplateId },
        include: {
          macros: true,
          recipes: true,
          instanceTemplates: true,
          user: true,
        },
      });
      return dayTemplate as DayTemplate;
    }
  );

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

  if (!dayTemplateBody.recipes) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Cannot create day template without any recipes!",
      dayTemplate: {},
    });
  }

  const recipesIds = dayTemplateBody.recipes as string[];

  const foundRecipes = await RecipeClient.findMany({
    where: { id: { in: recipesIds } },
    include: { macros: true },
  });

  if (foundRecipes.length < 1) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not find the recipes with the given ids!",
      recipes: [],
    });
  }

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

  await deleteCache(`dayTemplates`);
  await deleteCache(`${createdDayTemplate.id}:dayTemplates`);

  await setCache(
    `${createdDayTemplate.userId}:dayTemplates:${createdDayTemplate.id}`,
    createdDayTemplate
  );

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created day template with id:${createdDayTemplate.id}.`,
    dayTemplate: createdDayTemplate,
  });
};

const updateDayTemplate = async (req: Request, res: Response) => {
  const { dayTemplateId } = req.params;
  const dayTemplateBody = req.body;

  if (!dayTemplateId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a day template id!", dayTemplate: {} });
  }

  if (!dayTemplateBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", dayTemplate: {} });
  }

  const recipes = dayTemplateBody.recipes as Recipe[];

  const updatedDayTemplate = await DayTemplateClient.update({
    where: { id: dayTemplateId },
    data: {
      ...dayTemplateBody,
      recipes: {
        connect: recipes.map((recipe) => ({ id: recipe.id })),
      },
    },
    include: {
      macros: true,
      recipes: true,
      instanceTemplates: true,
      user: true,
    },
  });

  if (!updatedDayTemplate) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not update day template with id:${dayTemplateId}...`,
      dayTemplate: {},
    });
  }

  await deleteCache(`dayTemplates`);
  await deleteCache(`${updatedDayTemplate.userId}:dayTemplates`);

  await setCache(
    `${updatedDayTemplate.userId}:dayTemplates:${updatedDayTemplate.id}`,
    updatedDayTemplate
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated day template with id:${dayTemplateId}.`,
    dayTemplate: updatedDayTemplate,
  });
};

const deleteDayTemplate = async (req: Request, res: Response) => {
  const { dayTemplateId } = req.params;

  if (!dayTemplateId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a day template id!", dayTemplate: {} });
  }

  const deletedDayTemplate = await DayTemplateClient.delete({
    where: { id: dayTemplateId },
    include: {
      macros: true,
      recipes: true,
      instanceTemplates: true,
      user: true,
    },
  });

  if (!deletedDayTemplate) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not delete day template with id:${dayTemplateId}...`,
      dayTemplate: {},
    });
  }

  await deleteCache(`dayTemplates`);
  await deleteCache(`${deletedDayTemplate.userId}:dayTemplates`);

  await deleteCache(
    `${deletedDayTemplate.userId}:dayTemplates:${deletedDayTemplate.id}`
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted day template with id:${dayTemplateId}.`,
    dayTemplate: deletedDayTemplate,
  });
};

export {
  getAllDayTemplates,
  getDayTemplateById,
  createDayTemplate,
  updateDayTemplate,
  deleteDayTemplate,
};
