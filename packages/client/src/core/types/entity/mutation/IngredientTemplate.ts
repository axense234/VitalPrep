import {
  DayTemplate,
  Ingredient,
  InstanceTemplate,
  Macros,
  MealPrepPlan,
  Recipe,
} from "@prisma/client";

type OptionalIngredient<T> = {
  [K in keyof T]?: T[K];
};

type IngredientTemplate = OptionalIngredient<Ingredient> & {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  macros: Macros;
  recipes?: Recipe[];
  dayTemplates?: DayTemplate[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
};

export default IngredientTemplate;
