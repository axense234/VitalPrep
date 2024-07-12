// Express
import { Request, Response } from "express";
// Utils
import { randomUUID } from "crypto";
import { encryptPassword } from "../../utils/bcrypt";
import { createJWT } from "../../utils/jwt";
import { setCache, handleCacheMutation } from "../../utils/redis";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { UserClient } from "../../db/postgres";
// Data
import { defaultIngredients, defaultUtensils } from "../../data";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signupUser = async (req: Request, res: Response) => {
  const userBody = req.body;
  const throughOAuth = Boolean(req.query.throughOAuth);
  const locale = req.query.locale;

  if (!userBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Enter an userbody!" });
  }

  if (!userBody.username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an username!" });
  }

  if (!userBody.email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an email!" });
  }

  if (!emailRegex.test(userBody.email)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a valid email!" });
  }

  if (!userBody.password && !throughOAuth) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a password!" });
  }

  if (
    userBody.age === null ||
    userBody.age > 110 ||
    userBody.age < 8 ||
    Number.isNaN(userBody.age)
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a valid age!" });
  }

  if (throughOAuth) {
    userBody.password = randomUUID();
  }

  const encryptedPass = await encryptPassword(userBody.password);
  userBody.password = encryptedPass;

  // Get default entities data
  const defaultIngredientsData = defaultIngredients(locale as string);
  const defaultUtensilsData = defaultUtensils(locale as string);

  const createdUser = await UserClient.create({
    data: {
      ...userBody,
      notificationSettings: {
        create: {},
      },
      ingredients: {
        create: defaultIngredientsData,
      },
      utensils: {
        create: defaultUtensilsData,
      },
    },
  });

  if (!createdUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Could not create user!" });
  }

  const token = createJWT(createdUser.id, createdUser.username);

  await setCache(`${createdUser.id}:jwt-vitalprep`, token);

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created user with id:${createdUser.id}.`,
    token,
    user: createdUser,
  });
};

export default signupUser;
