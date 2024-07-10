// Express
import { Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
// Prisma
import {
  DayTemplateClient,
  IngredientClient,
  InstanceTemplateClient,
  MealPrepLogClient,
  MealPrepPlanClient,
  RecipeClient,
  UserClient,
  UtensilClient,
} from "../../db/postgres";
// Utils
import { deleteCache, handleCacheMutation } from "../../utils/redis";

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

  await UtensilClient.deleteMany({ where: { userId } });

  await RecipeClient.deleteMany({ where: { userId } });

  await DayTemplateClient.deleteMany({ where: { userId } });

  await InstanceTemplateClient.deleteMany({ where: { userId } });

  await MealPrepPlanClient.deleteMany({ where: { userId } });

  await MealPrepLogClient.deleteMany({ where: { userId } });

  await deleteCache(`${userId}:jwt-vitalprep`);
  await handleCacheMutation("users", userId as string);

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted user with id:${userId}.`,
    user: deletedUser,
  });
};

export default deleteUserById;
