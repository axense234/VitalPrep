// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { InstanceTemplateClient } from "../db/postgres";
import { DayTemplate, InstanceTemplate } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

const getAllInstanceTemplates = async (req: Request, res: Response) => {
  const foundInstanceTemplates = await getOrSetCache(
    "instanceTemplates",
    async () => {
      const instanceTemplates = await InstanceTemplateClient.findMany({
        include: {
          macros: true,
          dayTemplates: true,
          mealPrepPlans: true,
          mealPrepLogs: true,
          user: true,
        },
      });
      return instanceTemplates as InstanceTemplate[];
    }
  );

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

  if (!instanceTemplateId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter an instance template id!",
      instanceTemplate: {},
    });
  }

  const foundInstanceTemplate = await getOrSetCache(
    `${userId}:instanceTemplates:${instanceTemplateId}`,
    async () => {
      const instanceTemplate = await InstanceTemplateClient.findUnique({
        where: { id: instanceTemplateId },
        include: {
          macros: true,
          dayTemplates: true,
          mealPrepPlans: true,
          mealPrepLogs: true,
          user: true,
        },
      });
      return instanceTemplate as InstanceTemplate;
    }
  );

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

  if (!instanceTemplateBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", instanceTemplate: {} });
  }

  if (!instanceTemplateBody.dayTemplates) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Cannot create instance template without any day templates!",
      instanceTemplate: {},
    });
  }

  const dayTemplates = instanceTemplateBody.dayTemplates as DayTemplate[];

  const createdInstanceTemplate = await InstanceTemplateClient.create({
    data: {
      ...instanceTemplateBody,
      dayTemplates: {
        connect: dayTemplates.map((dayTemplate) => ({
          id: dayTemplate.id,
        })),
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
