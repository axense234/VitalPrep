import {
  DayTemplate,
  InstanceTemplate,
  MealPrepLog,
  MealPrepPlan,
  Recipe,
  Utensil,
} from "@prisma/client";

type UtensilType = Utensil & {
  recipes?: Recipe[];
  dayTemplates?: DayTemplate[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
  mealPrepLogs?: MealPrepLog[];
};

export default UtensilType;
