// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { MealPrepLogClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const deleteMealPrepLog = async (req: Request, res: Response) => {
  const { mealPrepLogId, userId } = req.params;

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

  await handleCacheMutation(
    "mealPrepLogs",
    userId as string,
    deletedMealPrepLog.id
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted meal prep log with id:${mealPrepLogId}.`,
    mealPrepLog: deletedMealPrepLog,
  });
};

export default deleteMealPrepLog;
