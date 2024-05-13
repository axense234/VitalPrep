import {
  DayTemplate,
  Ingredient,
  InstanceTemplate,
  Macros,
  MealPrepLog,
  MealPrepPlan,
  Recipe,
  RecipeTutorial,
  Utensil,
} from "@prisma/client";

type RecipeType = Recipe & {
  ingredients: string[] | Ingredient[];
  utensils: string[] | Utensil[];

  recipeTutorial?: RecipeTutorial;

  macros: Macros;

  dayTemplates?: DayTemplate[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
  mealPrepLogs?: MealPrepLog[];
};

export default RecipeType;
