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
  UtensilClient,
} from "../db/postgres";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

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

  const userId = userIdParams === "undefined" ? userIdCache : userIdParams;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a user id!", user: {} });
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

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a user id!", user: {} });
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
      message: `Could not find user with id:${userId}...`,
      user: {},
    });
  }

  await setCache(`users:${userId}`, updatedUser);
  await deleteCache("users");

  return res.status(StatusCodes.OK).json({
    message: `Successfully found user updated with id:${userId}.`,
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

  await IngredientClient.deleteMany({ where: { userId } });
  await UtensilClient.deleteMany({ where: { userId } });
  await RecipeClient.deleteMany({ where: { userId } });
  await DayTemplateClient.deleteMany({ where: { userId } });
  await InstanceTemplateClient.deleteMany({ where: { userId } });
  await MealPrepPlanClient.deleteMany({ where: { userId } });
  await MealPrepLogClient.deleteMany({ where: { userId } });

  const deletedUser = await UserClient.delete({
    where: { id: userId },
  });

  if (!deletedUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find user with id:${userId}...`,
      user: {},
    });
  }

  await deleteCache("jwt-vitalprep");
  await deleteCache(`users:${userId}`);

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted user with id:${userId}.`,
    user: deletedUser,
  });
};

// EXPORTS
export { getAllUsers, getUserById, updateUserById, deleteUserById };
