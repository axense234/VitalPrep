import {
  DayTemplate,
  Ingredient,
  InstanceTemplate,
  Macros,
  MealPrepLog,
  MealPrepPlan,
  Recipe,
} from "@prisma/client";

type IngredientType = Ingredient & {
  macros: Macros;
  recipes?: Recipe[];
  dayTemplates?: DayTemplate[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
  mealPrepLogs?: MealPrepLog[];
};

export default IngredientType;
