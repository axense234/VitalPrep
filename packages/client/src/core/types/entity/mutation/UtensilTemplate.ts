import {
  DayTemplate,
  InstanceTemplate,
  MealPrepPlan,
  Recipe,
  Utensil,
} from "@prisma/client";

type OptionalUtensil<T> = {
  [K in keyof T]?: T[K];
};

type UtensilTemplate = OptionalUtensil<Utensil> & {
  recipes?: Recipe[];
  dayTemplates?: DayTemplate[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
};

export default UtensilTemplate;
