import { Prisma } from "@prisma/client";

type UtensilsOrderByObject =
  | ({
      name?: "asc" | "desc";
      recipes?: { _count: string | undefined };
    } & Prisma.UtensilOrderByWithRelationInput)
  | Prisma.UtensilOrderByWithRelationInput[]
  | undefined;
export default UtensilsOrderByObject;
