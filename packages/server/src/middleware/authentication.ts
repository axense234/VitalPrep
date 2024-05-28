// Express
import { NextFunction, Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { createJWT, verifyJWT } from "../utils/jwt";
import { getCache, getOrSetCache } from "../utils/redis";
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
  const userId = req.query.userId || req.params.userId;
  const userEmail = req.query.userEmail;
  const adminPrivilegesSecret = req.query.adminPrivilegesSecret;

  // Skip Authentication from Admin Sources
  if (adminPrivilegesSecret === process.env.ADMIN_PRIVILEGES_SECRET) {
    console.log(`ADMIN USE AT:${new Date().toUTCString()}`);
    next();
  }

  // OAuth Flow
  if (userEmail && userEmail !== "undefined" && userEmail !== "null") {
    const foundUser = await UserClient.findUnique({
      where: { email: userEmail as string },
    });
    if (foundUser) {
      req.user = { userId: foundUser.id, username: foundUser.username };
      await getOrSetCache(`${foundUser.id}:jwt-vitalprep`, () => {
        return createJWT(foundUser.id, foundUser.username);
      });
      next();
      return;
    }
  }

  // Normal Flow
  if (!userId || userId === "null" || userId === "undefined") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide an userId!" });
  }

  // Cache Token
  const token = await getCache(`${userId}:jwt-vitalprep`);

  if (!token) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide a jwt!", type: "jwt" });
  }

  try {
    req.user = verifyJWT(token);
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Expired jwt.", type: "jwt" });
  }
};

export default authenticationMiddleware;
