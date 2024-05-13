import {
  DayTemplate,
  Ingredient,
  InstanceTemplate,
  Macros,
  MealPrepLog,
  MealPrepPlan,
  Recipe,
  Utensil,
} from "@prisma/client";

type DayTemplateType = DayTemplate & {
  recipes: string[] | Recipe[];
  macros: Macros;
  ingredients?: Ingredient[];
  utensils?: Utensil[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
  mealPrepLogs?: MealPrepLog[];
};

export default DayTemplateType;
