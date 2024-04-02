import { InstanceTemplate } from "@prisma/client";

type OptionalInstanceTemplate<T> = {
  [K in keyof T]?: T[K];
};

type InstanceTemplateTemplate = OptionalInstanceTemplate<InstanceTemplate> & {
  dayTemplates: string[];
};

export default InstanceTemplateTemplate;
