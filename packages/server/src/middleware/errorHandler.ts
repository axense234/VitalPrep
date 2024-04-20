// Prisma
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
// Express
import { ErrorRequestHandler } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const customError = {
    message: err.message || "Unexpected error.",
    code: (typeof err.code === "string" ? 500 : err.code || err.status) || 500,
    type: "normal",
  };

  console.log(err);

  if (err.code === "P2002") {
    customError.message = "Please provide an unique email!";
    customError.code = StatusCodes.BAD_REQUEST;
    customError.type = "email";
  }

  if (err.code === "P2025") {
    customError.message = "Resource does not exist!(category/name/user)";
    customError.code = StatusCodes.NOT_FOUND;
  }

  if (err instanceof PrismaClientValidationError) {
    customError.message = "Please enter a valid request body!";
    customError.code = StatusCodes.BAD_REQUEST;
  }

  return res
    .status(customError.code)
    .json({ message: customError.message, type: customError.type });
};

export default errorHandlerMiddleware;
