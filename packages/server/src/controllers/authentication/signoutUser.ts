// Express
import { Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache, handleCacheMutation } from "../../utils/redis";

const signoutUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await deleteCache(`${userId}:jwt-vitalprep`);
  await handleCacheMutation("users", userId as string);
  return res
    .status(StatusCodes.OK)
    .json({ message: "Successfully signed out!" });
};

export default signoutUser;
