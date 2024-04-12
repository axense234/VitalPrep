import { DayTemplate, Macros } from "@prisma/client";

type OptionalDayTemplate<T> = {
  [K in keyof T]?: T[K];
};

type DayTemplateTemplate = OptionalDayTemplate<DayTemplate> & {
  recipes: string[];
  macros: Macros;
};

export default DayTemplateTemplate;
