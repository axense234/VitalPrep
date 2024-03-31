import { DayTemplate } from "@prisma/client";

type OptionalDayTemplate<T> = {
  [K in keyof T]?: T[K];
};

type DayTemplateTemplate = OptionalDayTemplate<DayTemplate> & {
  recipes: string[];
};

export default DayTemplateTemplate;
