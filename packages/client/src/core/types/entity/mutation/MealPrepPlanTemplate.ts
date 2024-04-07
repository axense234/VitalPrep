import { MealPrepPlan } from "@prisma/client";

type OptionalMealPrepPlan<T> = {
  [K in keyof T]?: T[K];
};

type MealPrepPlanTemplate = OptionalMealPrepPlan<MealPrepPlan> & {
  instanceTemplates: string[];
};

export default MealPrepPlanTemplate;
