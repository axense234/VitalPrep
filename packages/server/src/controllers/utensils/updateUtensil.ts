// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { UtensilClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const updateUtensil = async (req: Request, res: Response) => {
  const { utensilId } = req.params;
  const utensilBody = req.body;
  const { userId, updateUtensilSingle } = req.query;

  if (!utensilId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a utensil id!", utensil: {} });
  }

  if (!utensilBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", utensil: {} });
  }

  if (utensilBody.user || userId) {
    utensilBody.user = {
      connect: { id: utensilBody?.user?.id || userId },
    };
    delete utensilBody?.userId;
  }

  if (updateUtensilSingle) {
    delete utensilBody?.recipes;
    delete utensilBody?.dayTemplates;
    delete utensilBody?.instanceTemplates;
    delete utensilBody?.mealPrepPlans;
    delete utensilBody?.mealPrepLogs;
  }

  const updatedUtensil = await UtensilClient.update({
    where: { id: utensilId },
    data: { ...utensilBody },
    include: {
      recipes: true,
      user: true,
    },
  });

  if (!updatedUtensil) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find utensil with id:${utensilId}...`,
      utensil: {},
    });
  }

  await handleCacheMutation("utensils", userId as string, updatedUtensil.id);

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated utensil with id:${utensilId}.`,
    utensil: updatedUtensil,
  });
};

export default updateUtensil;
