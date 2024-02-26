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

const signupUser = async (req: Request, res: Response) => {
  const userBody = req.body;

  const encryptedPass = await encryptPassword(userBody.password);
  userBody.password = encryptedPass;

  const createdUser = await UserClient.create({ data: { ...userBody } });

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
