import { Macros, MealPrepPlan } from "@prisma/client";

type OptionalMealPrepPlan<T> = {
  [K in keyof T]?: T[K];
};

type MealPrepPlanTemplate = OptionalMealPrepPlan<MealPrepPlan> & {
  instanceTemplates: string[];
  macros?: Macros;
};

export default MealPrepPlanTemplate;
