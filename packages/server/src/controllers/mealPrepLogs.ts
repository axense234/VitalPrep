// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { MealPrepLogClient } from "../db/postgres";
import { InstanceTemplate, MealPrepLog } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

const getAllMealPrepLogs = async (req: Request, res: Response) => {
  const foundMealPrepLogs = await getOrSetCache("mealPrepLogs", async () => {
    const mealPrepLogs = await MealPrepLogClient.findMany({
      include: {
        instanceTemplate: true,
        user: true,
      },
    });
    return mealPrepLogs as MealPrepLog[];
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

  if (!mealPrepLogId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a meal prep log id!", mealPrepLog: {} });
  }

  const foundMealPrepLog = await getOrSetCache(
    `${userId}:mealPrepLogs:${mealPrepLogId}`,
    async () => {
      const mealPrepLog = await MealPrepLogClient.findUnique({
        where: { id: mealPrepLogId },
        include: {
          instanceTemplate: true,
          user: true,
        },
      });
      return mealPrepLog as MealPrepLog;
    }
  );

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

  if (!mealPrepLogBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", mealPrepLog: {} });
  }

  if (!mealPrepLogBody.instanceTemplateId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Cannot create meal prep log without an instance template!",
      mealPrepLog: {},
    });
  }

  const instanceTemplate = mealPrepLogBody.instanceTemplate as InstanceTemplate;

  const createdMealPrepLog = await MealPrepLogClient.create({
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
