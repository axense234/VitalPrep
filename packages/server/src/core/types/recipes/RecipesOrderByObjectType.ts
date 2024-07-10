import { Prisma } from "@prisma/client";

type RecipesOrderByObject =
  | ({
      name?: "asc" | "desc";
      dayTemplates?: { _count: string | undefined };
    } & Prisma.RecipeOrderByWithRelationInput)
  | Prisma.RecipeOrderByWithRelationInput[]
  | undefined;
export default RecipesOrderByObject;
