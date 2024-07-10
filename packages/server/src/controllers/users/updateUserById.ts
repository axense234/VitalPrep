// Express
import { Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
// Prisma
import { UserClient, UserNotificationSettingsClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";
import { encryptPassword } from "../../utils/bcrypt";

const updateUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userBody = req.body;
  const {
    accountProfileModifications,
    accountNotificationModifications,
    accountMealPrepPlanInUseIdModifications,
  } = req.query;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an user id!", user: {} });
  }

  if (!userBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", user: {} });
  }

  if (accountNotificationModifications) {
    const notificationUpdateBody = userBody.notificationSettings;
    await UserNotificationSettingsClient.update({
      where: { id: userBody?.notificationSettingsId },
      data: { ...notificationUpdateBody },
    });
  }

  if (
    accountProfileModifications ||
    accountNotificationModifications ||
    accountMealPrepPlanInUseIdModifications
  ) {
    delete userBody?.ingredients;
    delete userBody?.utensils;
    delete userBody?.recipes;
    delete userBody?.dayTemplates;
    delete userBody?.instanceTemplates;
    delete userBody?.mealPrepPlans;
    delete userBody?.mealPrepLogs;
    delete userBody?.notificationSettings;
    delete userBody?.notificationSettingsId;
  }

  if (userBody.password && userBody.password === "") {
    delete userBody.password;
  }

  if (userBody.password) {
    userBody.password = await encryptPassword(userBody.password);
  }

  const updatedUser = await UserClient.update({
    where: { id: userId },
    data: { ...userBody },
    include: {
      ingredients: true,
      utensils: true,
      recipes: true,
      dayTemplates: true,
      instanceTemplates: true,
      mealPrepPlans: true,
      mealPrepLogs: true,
      notificationSettings: true,
    },
  });

  if (!updatedUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not update user with id:${userId}...`,
      user: {},
    });
  }

  await handleCacheMutation("users", userId as string);

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated user with id:${userId}.`,
    user: updatedUser,
  });
};

export default updateUserById;
