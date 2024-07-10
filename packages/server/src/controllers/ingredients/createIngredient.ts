// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { IngredientClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const createIngredient = async (req: Request, res: Response) => {
  const ingredientBody = req.body;
  const userId = req.query.userId;

  if (userId) {
    ingredientBody.user = { connect: { id: userId } };
  }

  const usedUserId = userId || ingredientBody?.userId;

  if (!usedUserId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No user id given!", utensil: {} });
  }

  if (!ingredientBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", ingredient: {} });
  }

  if (!ingredientBody.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter the name of the ingredient!",
      ingredient: {},
    });
  }

  if (!ingredientBody.macros) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter the macros of your ingredient!",
      ingredient: {},
    });
  }

  if (!ingredientBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", ingredient: {} });
  }

  delete ingredientBody.macros.id;
  const ingredientMacros = ingredientBody.macros;
  delete ingredientBody.macros;

  const createdIngredient = await IngredientClient.create({
    data: {
      ...ingredientBody,
      macros: {
        create: ingredientMacros,
      },
    },
    include: {
      macros: true,
      recipes: true,
      user: true,
    },
  });

  if (!createdIngredient) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not create ingredient! Verify the request body!",
      ingredient: {},
    });
  }

  await handleCacheMutation("ingredients", usedUserId as string);

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created ingredient with id:${createdIngredient.id}.`,
    ingredient: createdIngredient,
  });
};

export default createIngredient;
