import { Prisma } from "@prisma/client";

type DayTemplatesOrderByObject =
  | ({
      name?: "asc" | "desc";
      instanceTemplates?: { _count: string | undefined };
    } & Prisma.DayTemplateOrderByWithRelationInput)
  | Prisma.DayTemplateOrderByWithRelationInput[]
  | undefined;
export default DayTemplatesOrderByObject;
