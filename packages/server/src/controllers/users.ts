// Express
import { Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
// Prisma
import { User } from "@prisma/client";
import {
  DayTemplateClient,
  IngredientClient,
  InstanceTemplateClient,
  MealPrepLogClient,
  MealPrepPlanClient,
  RecipeClient,
  UserClient,
  UserNotificationSettingsClient,
  UtensilClient,
} from "../db/postgres";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";
import { encryptPassword } from "../utils/bcrypt";

const getAllUsers = async (req: Request, res: Response) => {
  const foundUsers = await getOrSetCache("users", async () => {
    const users = await UserClient.findMany({
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
    return users;
  });

  if (foundUsers.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Could not find any users!", users: [] });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found users!",
    nbHits: foundUsers.length,
    users: foundUsers,
  });
};

const getUserById = async (req: Request, res: Response) => {
  const userIdParams = req.params.userId;
  const userIdCache = req.user.userId;

  const userId = userIdParams ? userIdCache : userIdParams;

  if (!userId || userId === "null" || userId === "undefined") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an user id!", user: {} });
  }

  const foundUser = await getOrSetCache(`users:${userId}`, async () => {
    const user = await UserClient.findUnique({
      where: { id: userId },
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
    return user as User;
  });

  if (!foundUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find user with id:${userId}...`,
      user: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found user with id:${userId}.`,
    user: foundUser,
  });
};

const updateUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userBody = req.body;
  const { accountProfileModifications, accountNotificationModifications } =
    req.query;

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
    const response = await UserNotificationSettingsClient.update({
      where: { id: userBody?.notificationSettingsId },
      data: { ...notificationUpdateBody },
    });
    console.log(response);
  }

  if (accountProfileModifications || accountNotificationModifications) {
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

  await deleteCache("users");
  await setCache(`users:${userId}`, updatedUser);

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated user with id:${userId}.`,
    user: updatedUser,
  });
};

const deleteUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a user id!", user: {} });
  }

  const deletedUser = await UserClient.delete({
    where: { id: userId },
  });

  if (!deletedUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not delete user with id:${userId}...`,
      user: {},
    });
  }

  await IngredientClient.deleteMany({ where: { userId } });
  await deleteCache(`${userId}:ingredients`);

  await UtensilClient.deleteMany({ where: { userId } });
  await deleteCache(`${userId}:utensils`);

  await RecipeClient.deleteMany({ where: { userId } });
  await deleteCache(`${userId}:recipes`);

  await DayTemplateClient.deleteMany({ where: { userId } });
  await deleteCache(`${userId}:dayTemplates`);

  await InstanceTemplateClient.deleteMany({ where: { userId } });
  await deleteCache(`${userId}:instanceTemplates`);

  await MealPrepPlanClient.deleteMany({ where: { userId } });
  await deleteCache(`${userId}:mealPrepPlans`);

  await MealPrepLogClient.deleteMany({ where: { userId } });
  await deleteCache(`${userId}:mealPrepLogs`);

  await deleteCache(`${userId}:jwt-vitalprep`);
  await deleteCache(`users:${userId}`);
  await deleteCache("users");

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted user with id:${userId}.`,
    user: deletedUser,
  });
};

// EXPORTS
export { getAllUsers, getUserById, updateUserById, deleteUserById };
