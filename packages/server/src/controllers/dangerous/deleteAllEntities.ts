// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { prismaClient } from "../../db/postgres";

const deleteAllEntities = async (req: Request, res: Response) => {
  if (process.env.NODE_ENV !== "production") {
    const prisma = prismaClient;

    const models = Object.keys(prisma);

    for (const model of models) {
      if (model !== "constructor" && prisma[model].deleteMany) {
        await prisma[model].deleteMany({});
      }
    }

    console.log("All entities deleted successfully.");
    return res
      .status(StatusCodes.OK)
      .json({ message: "All entities deleted successfully." });
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Too dangerous for your use case." });
  }
};

export default deleteAllEntities;
