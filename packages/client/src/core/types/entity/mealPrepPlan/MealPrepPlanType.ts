import {
  DayTemplate,
  Ingredient,
  InstanceTemplate,
  Macros,
  MealPrepPlan,
  MealPrepPlanTiming,
  Recipe,
  Utensil,
} from "@prisma/client";

type MealPrepPlanType = MealPrepPlan & {
  macros: Macros;
  ingredients?: Ingredient[];
  utensils?: Utensil[];
  recipes?: Recipe[];
  dayTemplates?: DayTemplate[];
  instanceTemplates?: string[] | InstanceTemplate[];
  instanceTemplatesTimings: MealPrepPlanTiming[];
};

export default MealPrepPlanType;
