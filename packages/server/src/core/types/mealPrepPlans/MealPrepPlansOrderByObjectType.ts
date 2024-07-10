import { Prisma } from "@prisma/client";

type MealPrepPlansOrderByObject =
  | ({
      name?: "asc" | "desc";
    } & Prisma.MealPrepPlanOrderByWithRelationInput)
  | Prisma.MealPrepPlanOrderByWithRelationInput[]
  | undefined;
export default MealPrepPlansOrderByObject;
