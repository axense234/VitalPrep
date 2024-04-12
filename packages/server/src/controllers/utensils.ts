// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { UtensilClient } from "../db/postgres";
import { Utensil } from "@prisma/client";
// Utils
import { deleteCache, getOrSetCache, setCache } from "../utils/redis";

type UtensilsQueryObject = {
  userId?: string;
};

const getAllUtensils = async (req: Request, res: Response) => {
  const {
    userUtensils,
    sortByKey,
    sortByOrder,
    searchByKey,
    searchByValue,
    userId,
  } = req.query;

  const queryObject: UtensilsQueryObject = {};
  const orderByObject: any = {};

  if (userUtensils) {
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
  const foundUtensils = await UtensilClient.findMany({
    orderBy: orderByObject,
    where: queryObject,
    include: {
      recipes: true,
      user: true,
    },
  });

  // const foundUtensils = await getOrSetCache("utensils", async () => {
  //   const utensils = await UtensilClient.findMany({
  //     include: {
  //       recipes: true,
  //       user: true,
  //     },
  //   });
  //   return utensils as Utensil[];
  // });

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

  if (!utensilId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter an utensil id!", utensil: {} });
  }

  const foundUtensil = await getOrSetCache(
    `${userId}:utensils:${utensilId}`,
    async () => {
      const utensil = await UtensilClient.findUnique({
        where: { id: utensilId },
        include: {
          recipes: true,
          user: true,
        },
      });
      return utensil as Utensil;
    }
  );

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
