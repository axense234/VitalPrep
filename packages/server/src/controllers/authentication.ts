// Express
import { Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
// Prisma
import { UserClient } from "../db/postgres";
// Utils
import { encryptPassword, comparePasswords } from "../utils/bcrypt";
import { createJWT } from "../utils/jwt";
import { deleteCache, setCache } from "../utils/redis";
import { randomUUID } from "crypto";
// Data
import { defaultIngredients, defaultUtensils } from "../data";

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

  await deleteCache(`users`);
  await setCache(`${createdUser.id}:jwt-vitalprep`, token);
  await setCache(`users:${createdUser.id}`, createdUser);

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created user with id:${createdUser.id}.`,
    token,
    user: createdUser,
  });
};

const loginUser = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter both password and email!" });
  }

  if (!emailRegex.test(email)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a valid email!" });
  }

  const foundUser = await UserClient.findUnique({ where: { email } });

  if (!foundUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `Could not find any users with the email:${email}...` });
  }

  const passMatch = await comparePasswords(password, foundUser.password);

  if (!passMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Passwords do not match!" });
  }

  const token = createJWT(foundUser.id, foundUser.username);
  await setCache(`${foundUser.id}:jwt-vitalprep`, token);

  return res.status(StatusCodes.OK).json({
    message: `Successfully logged in as ${foundUser.username}!`,
    token,
    user: foundUser,
  });
};

const signoutUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await deleteCache(`${userId}:jwt-vitalprep`);
  return res
    .status(StatusCodes.OK)
    .json({ message: "Successfully signed out!" });
};

export { signupUser, loginUser, signoutUser };
