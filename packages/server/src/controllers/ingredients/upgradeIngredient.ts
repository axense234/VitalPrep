// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { IngredientClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const updateIngredient = async (req: Request, res: Response) => {
  const { ingredientId } = req.params;
  const ingredientBody = req.body;

  const { userId, updateIngredientSingle } = req.query;
  const usedUserId = ingredientBody?.userId || userId;

  if (!ingredientId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an ingredient id!", ingredient: {} });
  }

  if (!ingredientBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", ingredient: {} });
  }

  if (usedUserId) {
    ingredientBody.user = {
      connect: { id: usedUserId },
    };
    delete ingredientBody?.userId;
  }

  if (ingredientBody.macros) {
    ingredientBody.macros = { update: ingredientBody.macros };
    delete ingredientBody?.macrosId;
  }

  if (updateIngredientSingle) {
    delete ingredientBody?.recipes;
    delete ingredientBody?.dayTemplates;
    delete ingredientBody?.instanceTemplates;
    delete ingredientBody?.mealPrepPlans;
    delete ingredientBody?.mealPrepLogs;
  }

  const updatedIngredient = await IngredientClient.update({
    where: { id: ingredientId },
    data: { ...ingredientBody },
    include: {
      macros: true,
      recipes: true,
      user: true,
    },
  });

  if (!updatedIngredient) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not update ingredient with id:${ingredientId}...`,
      ingredient: {},
    });
  }

  await handleCacheMutation(
    "ingredients",
    usedUserId as string,
    updatedIngredient.id
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated ingredient with id:${ingredientId}.`,
    ingredient: updatedIngredient,
  });
};

export default updateIngredient;
