// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { UtensilClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const deleteUtensil = async (req: Request, res: Response) => {
  const { utensilId, userId } = req.params;

  if (!utensilId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an utensil id!", utensil: {} });
  }

  const deletedUtensil = await UtensilClient.delete({
    where: { id: utensilId },
    include: {
      recipes: true,
      user: true,
    },
  });

  if (!deletedUtensil) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find utensil with id:${utensilId}...`,
      utensil: {},
    });
  }

  await handleCacheMutation("utensils", userId as string, deletedUtensil.id);

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted utensil with id:${utensilId}.`,
    utensil: deletedUtensil,
  });
};

export default deleteUtensil;
