// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { RecipeClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const deleteRecipe = async (req: Request, res: Response) => {
  const { recipeId, userId } = req.params;

  if (!recipeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a recipe id!", recipe: {} });
  }

  const deletedRecipe = await RecipeClient.delete({
    where: { id: recipeId },
    include: {
      macros: true,
      utensils: true,
      ingredients: true,
      dayTemplates: true,
      recipeTutorial: true,
      user: true,
    },
  });

  if (!deletedRecipe) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not delete recipe with id:${recipeId}...`,
      recipe: {},
    });
  }

  await handleCacheMutation("recipes", userId as string, deletedRecipe.id);

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted recipe with id:${recipeId}.`,
    recipe: deletedRecipe,
  });
};

export default deleteRecipe;
