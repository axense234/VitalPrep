// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { IngredientClient } from "../db/postgres";
import { Ingredient } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

const getAllIngredients = async (req: Request, res: Response) => {
  const foundIngredients = await getOrSetCache("ingredients", async () => {
    const ingredients = await IngredientClient.findMany({
      include: {
        macros: true,
        recipes: true,
        user: true,
      },
    });
    return ingredients as Ingredient[];
  });

  if (foundIngredients.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Could not find any ingredients!", ingredients: [] });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all ingredients!",
    nbHits: foundIngredients.length,
    ingredients: foundIngredients,
  });
};

const getIngredientById = async (req: Request, res: Response) => {
  const { ingredientId, userId } = req.params;

  if (!ingredientId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an ingredient id!", ingredient: {} });
  }

  const foundIngredient = await getOrSetCache(
    `${userId}:ingredients:${ingredientId}`,
    async () => {
      const ingredient = await IngredientClient.findUnique({
        where: { id: ingredientId },
        include: {
          macros: true,
          recipes: true,
          user: true,
        },
      });
      return ingredient as Ingredient;
    }
  );

  if (!foundIngredient) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find any ingredients with id:${ingredientId}...`,
      ingredient: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found ingredient with id:${ingredientId}.`,
    ingredient: foundIngredient,
  });
};

const createIngredient = async (req: Request, res: Response) => {
  const ingredientBody = req.body;

  if (!ingredientBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", ingredient: {} });
  }

  const createdIngredient = await IngredientClient.create({
    data: {
      ...ingredientBody,
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
  await deleteCache(`ingredients`);
  await deleteCache(`${createdIngredient.userId}:ingredients`);

  await setCache(
    `${createdIngredient.userId}:ingredients:${createdIngredient.id}`,
    createdIngredient
  );

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created ingredient with id:${createdIngredient.id}.`,
    ingredient: createdIngredient,
  });
};

const updateIngredient = async (req: Request, res: Response) => {
  const { ingredientId } = req.params;
  const ingredientBody = req.body;

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

  await deleteCache(`ingredients`);
  await deleteCache(`${updatedIngredient.userId}:ingredients`);

  await setCache(
    `${updatedIngredient.userId}:ingredients:${updatedIngredient.id}`,
    updatedIngredient
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated ingredient with id:${ingredientId}.`,
    ingredient: updatedIngredient,
  });
};

const deleteIngredient = async (req: Request, res: Response) => {
  const { ingredientId } = req.params;

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

  await deleteCache(`ingredients`);
  await deleteCache(`${deletedIngredient.userId}:ingredients`);

  await deleteCache(
    `${deletedIngredient.userId}:ingredients:${deletedIngredient.id}`
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted ingredient with id:${ingredientId}.`,
    ingredient: deletedIngredient,
  });
};

export {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
