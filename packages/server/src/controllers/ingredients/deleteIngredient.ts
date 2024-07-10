// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { IngredientClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const deleteIngredient = async (req: Request, res: Response) => {
  const { ingredientId } = req.params;
  const { userId } = req.query;

  if (!ingredientId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an ingredient id!", ingredient: {} });
  }

  const deletedIngredient = await IngredientClient.delete({
    where: { id: ingredientId },
    include: {
      macros: true,
      recipes: true,
      user: true,
    },
  });

  if (!deletedIngredient) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not delete ingredient with id:${ingredientId}...`,
      ingredient: {},
    });
  }
  const usedUserId = deletedIngredient?.userId || userId;

  await handleCacheMutation(
    "ingredients",
    usedUserId as string,
    deletedIngredient.id
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted ingredient with id:${ingredientId}.`,
    ingredient: deletedIngredient,
  });
};

export default deleteIngredient;
