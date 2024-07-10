import { Prisma } from "@prisma/client";

type InstanceTemplatesOrderByObject =
  | ({
      name?: "asc" | "desc";
      coverage?: number;
      mealPrepPlans?: { _count: string | undefined };
    } & Prisma.InstanceTemplateOrderByWithRelationInput)
  | Prisma.InstanceTemplateOrderByWithRelationInput[]
  | undefined;
export default InstanceTemplatesOrderByObject;
