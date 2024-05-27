// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { UtensilClient } from "../db/postgres";
import { Prisma, Utensil } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

type GetAllUtensilsQueryObject = {
  userId?: string;
};

type UtensilsOrderByObject =
  | ({
      name?: "asc" | "desc";
      recipes?: { _count: string | undefined };
    } & Prisma.UtensilOrderByWithRelationInput)
  | Prisma.UtensilOrderByWithRelationInput[]
  | undefined;

type UtensilsIncludeObject = {
  macros?: boolean;
  user?: boolean;
  recipes?: boolean;
  dayTemplates?: boolean;
  instanceTemplates?: boolean;
  mealPrepPlans?: boolean;
};

type GetUtensilByIdQueryObject = {
  id: string;
  macrosId?: string;
};

const getAllUtensils = async (req: Request, res: Response) => {
  const {
    userUtensils,
    userId,
    searchByKey,
    searchByValue,
    sortByKey,
    sortByOrder,
    includeMacros,
    includeUser,
    includeRecipes,
    includeDayTemplates,
    includeInstanceTemplates,
    includeMealPrepPlans,
  } = req.query;

  const queryObject: GetAllUtensilsQueryObject = {};
  const orderByObject: UtensilsOrderByObject = {};
  const includeObject: UtensilsIncludeObject = {};

  // QUERY
  if (userUtensils) {
    queryObject.userId = userId as string;
  }

  if (searchByKey) {
    queryObject[searchByKey as string] = {
      contains: (searchByValue as string) || "",
    };
  }

  // ORDER BY
  if (sortByKey === "numberOfRecipes") {
    orderByObject.recipes = { _count: sortByOrder as "asc" | "desc" };
  } else if (sortByKey) {
    orderByObject[sortByKey as string] = (sortByOrder as string) || "asc";
  }

  // INCLUDE

  const foundUtensils = await UtensilClient.findMany({
    orderBy: orderByObject,
    where: queryObject,
    include: includeObject,
  });

  // INCLUDE
  if (includeMacros) {
    includeObject.macros = true;
  }
  if (includeUser) {
    includeObject.user = true;
  }
  if (includeRecipes) {
    includeObject.recipes = true;
  }
  if (includeDayTemplates) {
    includeObject.dayTemplates = true;
  }
  if (includeInstanceTemplates) {
    includeObject.instanceTemplates = true;
  }
  if (includeMealPrepPlans) {
    includeObject.mealPrepPlans = true;
  }

  console.log(foundUtensils);

  if (foundUtensils.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Could not find any utensils!", utensils: [] });
  }

  return res.status(StatusCodes.OK).json({
    message: "Successfully found all utensils!",
    nbHits: foundUtensils.length,
    utensils: foundUtensils,
  });
};

const getUtensilById = async (req: Request, res: Response) => {
  const { utensilId, userId } = req.params;
  const {
    includeMacros,
    includeUser,
    includeRecipes,
    includeDayTemplates,
    includeInstanceTemplates,
    includeMealPrepPlans,
  } = req.query;
  const includeObject: UtensilsIncludeObject = {};
  const queryObject: GetUtensilByIdQueryObject = { id: "" };

  if (!utensilId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an utensil id!", utensil: {} });
  }
  queryObject.id = utensilId;

  // QUERY
  if (userId) {
    // queryObject.id = userId;
  }

  // INCLUDE
  if (includeMacros) {
    includeObject.macros = true;
  }
  if (includeUser) {
    includeObject.user = true;
  }
  if (includeRecipes) {
    includeObject.recipes = true;
  }
  if (includeDayTemplates) {
    includeObject.dayTemplates = true;
  }
  if (includeInstanceTemplates) {
    includeObject.instanceTemplates = true;
  }
  if (includeMealPrepPlans) {
    includeObject.mealPrepPlans = true;
  }

  const foundUtensil = await UtensilClient.findUnique({
    where: queryObject,
    include: includeObject,
  });

  if (!foundUtensil) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not find any utensils with id:${utensilId}...`,
      utensil: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    message: `Successfully found utensil with id:${utensilId}.`,
    utensil: foundUtensil,
  });
};

const createUtensil = async (req: Request, res: Response) => {
  const utensilBody = req.body;
  const userId = req.query.userId;

  if (userId) {
    utensilBody.user = { connect: { id: userId } };
  }

  if (!utensilBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", utensil: {} });
  }

  if (!utensilBody.name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an utensil name!", utensil: {} });
  }

  const createdUtensil = await UtensilClient.create({
    data: {
      ...utensilBody,
    },
    include: {
      recipes: true,
      user: true,
    },
  });

  if (!createdUtensil) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Could not create utensil! Verify the request body!",
      utensil: {},
    });
  }

  await deleteCache(`utensils`);
  await deleteCache(`${createdUtensil.userId}:utensils`);

  await setCache(
    `${createdUtensil.userId}:utensils:${createdUtensil.id}`,
    createdUtensil
  );

  return res.status(StatusCodes.CREATED).json({
    message: `Successfully created utensil with id:${createdUtensil.id}.`,
    utensil: createdUtensil,
  });
};

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

  await deleteCache(`utensils`);
  await deleteCache(`${updatedUtensil.userId}:utensils`);

  await setCache(
    `${updatedUtensil.userId}:utensils:${updatedUtensil.id}`,
    updatedUtensil
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated utensil with id:${utensilId}.`,
    utensil: updatedUtensil,
  });
};

const deleteUtensil = async (req: Request, res: Response) => {
  const { utensilId } = req.params;

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

  await deleteCache(`utensils`);
  await deleteCache(`${deletedUtensil.userId}:utensils`);

  await deleteCache(`${deletedUtensil.userId}:utensils:${deletedUtensil.id}`);

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted utensil with id:${utensilId}.`,
    utensil: deletedUtensil,
  });
};

export {
  getAllUtensils,
  getUtensilById,
  createUtensil,
  updateUtensil,
  deleteUtensil,
};
