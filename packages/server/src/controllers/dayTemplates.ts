// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { DayTemplateClient } from "../db/postgres";
import { DayTemplate, Recipe } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

const getAllDayTemplates = async (req: Request, res: Response) => {
  const foundDayTemplates = await DayTemplateClient.findMany({});

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
  const { dayTemplateId } = req.params;

  if (!dayTemplateId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a day template id!", dayTemplate: {} });
  }

  const foundDayTemplate = await getOrSetCache(
    `dayTemplates:${dayTemplateId}`,
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

  const recipes = dayTemplateBody.recipes as Recipe[];

  const createdDayTemplate = await DayTemplateClient.create({
    data: {
      ...dayTemplateBody,
      recipes: {
        connect: recipes.map((recipe) => ({
          id: recipe.id,
        })),
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
  await setCache(`dayTemplates:${createdDayTemplate.id}`, createdDayTemplate);

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
      message: `Could not find day template with id:${dayTemplateId}...`,
      dayTemplate: {},
    });
  }

  await setCache(`dayTemplates:${updatedDayTemplate.id}`, updatedDayTemplate);

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
      message: `Could not find day template with id:${dayTemplateId}...`,
      dayTemplate: {},
    });
  }

  await deleteCache(`dayTemplate:${deletedDayTemplate.id}`);

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
