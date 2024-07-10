// Express
import { Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
// Prisma
import { UserClient } from "../../db/postgres";
// Utils
import { getOrSetCache } from "../../utils/redis";

const getAllUsers = async (req: Request, res: Response) => {
  const foundUsers = await getOrSetCache(req.url, async () => {
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

export default getAllUsers;
