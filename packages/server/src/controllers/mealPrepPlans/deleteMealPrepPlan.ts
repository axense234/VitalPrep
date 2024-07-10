// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { MealPrepPlanClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const deleteMealPrepPlan = async (req: Request, res: Response) => {
  const { mealPrepPlanId } = req.params;
  const { userId } = req.query;

  if (!mealPrepPlanId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a meal prep plan id!", mealPrepPlan: {} });
  }

  const deletedMealPrepPlan = await MealPrepPlanClient.delete({
    where: { id: mealPrepPlanId },
    include: {
      macros: true,
      instanceTemplates: true,
      user: true,
    },
  });

  if (!deletedMealPrepPlan) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not delete meal prep plan with id:${mealPrepPlanId}...`,
      mealPrepPlan: {},
    });
  }

  await handleCacheMutation(
    "mealPrepPlans",
    userId as string,
    deletedMealPrepPlan.id
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted meal prep plan with id:${mealPrepPlanId}.`,
    mealPrepPlan: deletedMealPrepPlan,
  });
};

export default deleteMealPrepPlan;
