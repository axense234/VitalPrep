import { Prisma } from "@prisma/client";

type MealPrepLogsOrderByObject =
  | ({
      name?: "asc" | "desc";
      completed?: "asc" | "desc";
    } & Prisma.MealPrepLogOrderByWithRelationInput)
  | Prisma.MealPrepLogOrderByWithRelationInput[]
  | undefined;
export default MealPrepLogsOrderByObject;
