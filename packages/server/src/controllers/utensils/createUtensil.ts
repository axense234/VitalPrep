// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { UtensilClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const createUtensil = async (req: Request, res: Response) => {
  const utensilBody = req.body;
  const userId = req.query.userId;

  if (userId) {
    utensilBody.user = { connect: { id: userId } };
  }

  const usedUserId = userId || utensilBody.userId;

  if (!usedUserId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No user id given!", utensil: {} });
  }

  if (!utensilBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", utensil: {} });
  }

  if (!utensilBody.name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an utensil name!", utensil: {} });
  }

  const createdUtensil = await UtensilClient.create({
    data: {
      ...utensilBody,
    },
    include: {
      recipes: true,
      user: true,
    },
  });

  if (!createdUtensil) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not create utensil! Verify the request body!",
      utensil: {},
    });
  }

  await handleCacheMutation("utensils", usedUserId as string);

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created utensil with id:${createdUtensil.id}.`,
    utensil: createdUtensil,
  });
};

export default createUtensil;
