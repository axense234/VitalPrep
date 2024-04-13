// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { InstanceTemplateClient, MealPrepPlanClient } from "../db/postgres";
import { InstanceTemplate, MealPrepPlan } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

type MealPrepPlanQueryObject = {
  userId?: string;
};

const getAllMealPrepPlans = async (req: Request, res: Response) => {
  const {
    userMealPrepPlans,
    sortByKey,
    sortByOrder,
    searchByKey,
    searchByValue,
    userId,
  } = req.query;

  const queryObject: MealPrepPlanQueryObject = {};
  const orderByObject: any = {};

  if (userMealPrepPlans) {
    queryObject.userId = userId as string;
  }

  if (sortByKey === "numberOfRecipes") {
    orderByObject.recipes = { _count: sortByOrder };
  } else if (sortByKey) {
    orderByObject[sortByKey as string] = (sortByOrder as string) || "asc";
  }

  if (searchByKey) {
    queryObject[searchByKey as string] = {
      contains: (searchByValue as string) || "",
    };
  }

  const foundMealPrepPlans = await MealPrepPlanClient.findMany({
    orderBy: orderByObject,
    where: queryObject,
    include: {
      macros: true,
      instanceTemplates: true,
      user: true,
    },
  });

  // const foundMealPrepPlans = await getOrSetCache("mealPrepPlans", async () => {
  //   const mealPrepPlans = await MealPrepPlanClient.findMany({
  //     where: queryObject,
  //     include: {
  //       macros: true,
  //       instanceTemplates: true,
  //       user: true,
  //     },
  //   });
  //   return mealPrepPlans as MealPrepPlan[];
  // });

  if (foundMealPrepPlans.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Could not find any meal prep plans!",
      mealPrepPlans: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all meal prep plans!",
    nbHits: foundMealPrepPlans.length,
    mealPrepPlans: foundMealPrepPlans,
  });
};

const getMealPrepPlanById = async (req: Request, res: Response) => {
  const { mealPrepPlanId, userId } = req.params;

  if (!mealPrepPlanId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a meal prep plan id!", mealPrepPlan: {} });
  }

  const foundMealPrepPlan = await getOrSetCache(
    `${userId}:mealPrepPlans:${mealPrepPlanId}`,
    async () => {
      const mealPrepPlan = await MealPrepPlanClient.findUnique({
        where: { id: mealPrepPlanId },
        include: {
          macros: true,
          instanceTemplates: true,
          user: true,
        },
      });
      return mealPrepPlan as MealPrepPlan;
    }
  );

  if (!foundMealPrepPlan) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find any meal prep plans with id:${mealPrepPlanId}...`,
      mealPrepPlan: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found meal prep plan with id:${mealPrepPlanId}.`,
    mealPrepPlan: foundMealPrepPlan,
  });
};

const createMealPrepPlan = async (req: Request, res: Response) => {
  const mealPrepPlanBody = req.body;
  const userId = req.query.userId;

  if (userId) {
    mealPrepPlanBody.user = { connect: { id: userId } };
  }

  if (!mealPrepPlanBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", mealPrepPlan: {} });
  }

  if (!mealPrepPlanBody.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter a meal prep plan name!",
      mealPrepPlan: {},
    });
  }

  if (!mealPrepPlanBody.instanceTemplates) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Cannot create meal prep plan without any instance templates!",
      mealPrepPlan: {},
    });
  }

  if (!mealPrepPlanBody.instanceTemplatesTimings) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid instance templates timings!",
      mealPrepPlan: {},
    });
  }

  const instanceTemplatesIds = mealPrepPlanBody.instanceTemplates as string[];

  const foundInstanceTemplates = await InstanceTemplateClient.findMany({
    where: { id: { in: instanceTemplatesIds } },
    include: { macros: true },
  });

  if (foundInstanceTemplates.length < 1) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not find the instance templates with the given ids!",
      instanceTemplates: [],
    });
  }

  let mealPrepPlanMacros = {
    calories: 0,
    carbsAmount: 0,
    fatsAmount: 0,
    proteinAmount: 0,
  };

  foundInstanceTemplates.forEach((instanceTemplate) => {
    mealPrepPlanMacros.calories += instanceTemplate.macros.calories;
    mealPrepPlanMacros.proteinAmount += instanceTemplate.macros.proteinAmount;
    mealPrepPlanMacros.carbsAmount += instanceTemplate.macros.carbsAmount;
    mealPrepPlanMacros.fatsAmount += instanceTemplate.macros.fatsAmount;
  });

  const createdMealPrepPlan = await MealPrepPlanClient.create({
    data: {
      ...mealPrepPlanBody,
      instanceTemplates: {
        connect: instanceTemplatesIds.map((instanceTemplate) => ({
          id: instanceTemplate,
        })),
      },
      macros: {
        create: mealPrepPlanMacros,
      },
    },
    include: {
      macros: true,
      instanceTemplates: true,
      user: true,
    },
  });

  if (!createdMealPrepPlan) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not create meal prep plan! Verify the request body!",
      mealPrepPlan: {},
    });
  }

  await deleteCache(`mealPrepPlans`);
  await deleteCache(`${createdMealPrepPlan.userId}:mealPrepPlans`);

  await setCache(
    `${createdMealPrepPlan.userId}:mealPrepPlans:${createdMealPrepPlan.id}`,
    createdMealPrepPlan
  );

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created meal prep plan with id:${createdMealPrepPlan.id}.`,
    mealPrepPlan: createdMealPrepPlan,
  });
};

const updateMealPrepPlan = async (req: Request, res: Response) => {
  const { mealPrepPlanId } = req.params;
  const mealPrepPlanBody = req.body;

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

  const instanceTemplates =
    mealPrepPlanBody.instanceTemplates as InstanceTemplate[];

  const updatedMealPrepPlan = await MealPrepPlanClient.update({
    where: { id: mealPrepPlanId },
    data: {
      ...mealPrepPlanBody,
      instanceTemplates: {
        connect: instanceTemplates.map((instanceTemplate) => ({
          id: instanceTemplate.id,
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

  await deleteCache(`mealPrepPlans`);
  await deleteCache(`${updatedMealPrepPlan.userId}:mealPrepPlans`);

  await setCache(
    `${updatedMealPrepPlan.userId}:mealPrepPlans:${updatedMealPrepPlan.id}`,
    updatedMealPrepPlan
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated meal prep plan with id:${mealPrepPlanId}.`,
    mealPrepPlan: updatedMealPrepPlan,
  });
};

const deleteMealPrepPlan = async (req: Request, res: Response) => {
  const { mealPrepPlanId } = req.params;

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

  await deleteCache(`mealPrepPlans`);
  await deleteCache(`${deletedMealPrepPlan.userId}:mealPrepPlans`);

  await deleteCache(
    `${deletedMealPrepPlan.userId}:mealPrepPlans:${deletedMealPrepPlan.id}`
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted meal prep plan with id:${mealPrepPlanId}.`,
    mealPrepPlan: deletedMealPrepPlan,
  });
};

export {
  getAllMealPrepPlans,
  getMealPrepPlanById,
  createMealPrepPlan,
  updateMealPrepPlan,
  deleteMealPrepPlan,
};
