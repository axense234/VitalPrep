// Express
import { NextFunction, Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";

const allowRouteUse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uniqueIdentifier = req.query.uniqueIdentifier;
  if (!uniqueIdentifier) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Provide an unique identifier for this route!" });
  }

  if (uniqueIdentifier !== process.env.ADMIN_USE_UNIQUE_IDENTIFIER) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid unique identifier!" });
  }

  next();
};

export default allowRouteUse;
