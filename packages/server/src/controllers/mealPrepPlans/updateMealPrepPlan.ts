// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { MealPrepPlanClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const updateMealPrepPlan = async (req: Request, res: Response) => {
  const { mealPrepPlanId } = req.params;
  const mealPrepPlanBody = req.body;
  const { userId, updateMealPrepPlanSingle } = req.query;

  console.log(mealPrepPlanBody, userId, mealPrepPlanBody?.user?.id);

  if (!mealPrepPlanId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a meal prep plan id!", mealPrepPlan: {} });
  }

  if (!mealPrepPlanBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", mealPrepPlan: {} });
  }

  if (mealPrepPlanBody.user || userId) {
    mealPrepPlanBody.user = {
      connect: { id: mealPrepPlanBody?.user?.id || userId },
    };
    delete mealPrepPlanBody?.userId;
  }

  if (mealPrepPlanBody.macros) {
    mealPrepPlanBody.macros = { update: mealPrepPlanBody.macros };
    delete mealPrepPlanBody?.macrosId;
  }

  if (updateMealPrepPlanSingle) {
    delete mealPrepPlanBody?.ingredients;
    delete mealPrepPlanBody?.utensils;
    delete mealPrepPlanBody?.recipes;
    delete mealPrepPlanBody?.dayTemplates;
    delete mealPrepPlanBody?.mealPrepLogs;
  }

  if (mealPrepPlanBody.instanceTemplatesTimings) {
    mealPrepPlanBody.instanceTemplatesTimings = {
      updateMany: mealPrepPlanBody.instanceTemplatesTimings.map((instance) => {
        return {
          update: {
            ...instance,
          },
        };
      }),
    };
  }

  const instanceTemplates = mealPrepPlanBody.instanceTemplates as string[];

  const updatedMealPrepPlan = await MealPrepPlanClient.update({
    where: { id: mealPrepPlanId },
    data: {
      instanceTemplates: {
        connect: instanceTemplates.map((instanceTemplate) => ({
          id: instanceTemplate,
        })),
      },
    },
    include: {
      macros: true,
      instanceTemplates: true,
      user: true,
    },
  });

  if (!updatedMealPrepPlan) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find meal prep plan with id:${mealPrepPlanId}...`,
      mealPrepPlan: {},
    });
  }

  await handleCacheMutation(
    "mealPrepPlans",
    userId as string,
    updatedMealPrepPlan.id
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated meal prep plan with id:${mealPrepPlanId}.`,
    mealPrepPlan: updatedMealPrepPlan,
  });
};

export default updateMealPrepPlan;
