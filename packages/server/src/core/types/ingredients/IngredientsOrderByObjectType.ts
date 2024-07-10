import { Prisma } from "@prisma/client";

type IngredientsOrderByObject =
  | ({
      name?: "asc" | "desc";
      recipes?: { _count: string | undefined };
    } & Prisma.IngredientOrderByWithRelationInput)
  | Prisma.IngredientOrderByWithRelationInput[]
  | undefined;
export default IngredientsOrderByObject;
