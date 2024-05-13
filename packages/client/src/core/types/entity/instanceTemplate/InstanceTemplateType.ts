import {
  DayTemplate,
  Macros,
  Ingredient,
  Utensil,
  Recipe,
  MealPrepPlan,
  MealPrepLog,
  InstanceTemplate,
} from "@prisma/client";

type InstanceTemplateType = InstanceTemplate & {
  dayTemplates: string[] | DayTemplate[];
  macros: Macros;
  ingredients?: Ingredient[];
  utensils?: Utensil[];
  recipes?: Recipe[];
  mealPrepPlans?: MealPrepPlan[];
  mealPrepLogs?: MealPrepLog[];
};

export default InstanceTemplateType;
