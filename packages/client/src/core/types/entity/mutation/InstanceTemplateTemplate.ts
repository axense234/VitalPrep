import { InstanceTemplate, Macros } from "@prisma/client";

type OptionalInstanceTemplate<T> = {
  [K in keyof T]?: T[K];
};

type InstanceTemplateTemplate = OptionalInstanceTemplate<InstanceTemplate> & {
  dayTemplates: string[];
  macros?: Macros;
};

export default InstanceTemplateTemplate;
