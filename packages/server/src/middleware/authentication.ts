// Express
import { NextFunction, Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { verifyJWT } from "../utils/jwt";
import { getOrSetCache } from "../utils/redis";
import { UserClient } from "../db/postgres";

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
}

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization as string;
  const userId = req.query.userId || req.params.userId;
  const userEmail = req.query.userEmail;

  if (userEmail) {
    const foundUser = await UserClient.findUnique({
      where: { email: userEmail as string },
    });
    if (foundUser) {
      req.user = { userId: foundUser.id, username: foundUser.username };
      await getOrSetCache(`${foundUser.id}:jwt-vitalprep`, () => {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return null;
        }

        return authHeader.split(" ")[1];
      });
      next();
      return;
    }
  }

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide an userId!" });
  }

  const token = await getOrSetCache(`${userId}:jwt-vitalprep`, () => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    return authHeader.split(" ")[1];
  });

  if (!token) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide a jwt!" });
  }

  try {
    req.user = verifyJWT(token);
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Expired jwt." });
  }
};

export default authenticationMiddleware;
