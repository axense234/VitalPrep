// Express
import { Request, Response } from "express";
// Utils
import { createJWT } from "../../utils/jwt";
import { setCache } from "../../utils/redis";
import { comparePasswords } from "../../utils/bcrypt";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { UserClient } from "../../db/postgres";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export default loginUser;
