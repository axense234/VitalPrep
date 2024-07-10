// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { MealPrepLogClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const updateMealPrepLog = async (req: Request, res: Response) => {
  const { mealPrepLogId } = req.params;
  const mealPrepLogBody = req.body;
  const { userId, updateMealPrepLogSingle } = req.query;

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

  if (mealPrepLogBody.user || userId) {
    mealPrepLogBody.user = {
      connect: { id: mealPrepLogBody?.user?.id || userId },
    };
    delete mealPrepLogBody?.userId;
  }

  if (mealPrepLogBody.macros) {
    delete mealPrepLogBody?.macrosId;
    delete mealPrepLogBody?.macros;
  }

  if (updateMealPrepLogSingle) {
    delete mealPrepLogBody?.ingredients;
    delete mealPrepLogBody?.utensils;
    delete mealPrepLogBody?.recipes;
    delete mealPrepLogBody?.dayTemplates;
    delete mealPrepLogBody?.instanceTemplates;
    delete mealPrepLogBody?.mealPrepPlans;
  }

  if (mealPrepLogBody.instanceTemplate) {
    mealPrepLogBody.instanceTemplate = {
      connect: { id: mealPrepLogBody.instanceTemplate.id },
    };
    delete mealPrepLogBody?.instanceTemplateId;
  }

  const updatedMealPrepLog = await MealPrepLogClient.update({
    where: { id: mealPrepLogId },
    data: {
      ...mealPrepLogBody,
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

  await handleCacheMutation(
    "mealPrepLogs",
    userId as string,
    updatedMealPrepLog.id
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated meal prep log with id:${mealPrepLogId}.`,
    mealPrepLog: updatedMealPrepLog,
  });
};

export default updateMealPrepLog;
