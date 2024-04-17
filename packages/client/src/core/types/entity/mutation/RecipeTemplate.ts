import {
  DayTemplate,
  InstanceTemplate,
  Macros,
  MealPrepPlan,
  Recipe,
  RecipeTutorial,
} from "@prisma/client";
import IngredientTemplate from "./IngredientTemplate";
import UtensilTemplate from "./UtensilTemplate";

type OptionalRecipe<T> = {
  [K in keyof T]?: T[K];
};

type RecipeTemplate = OptionalRecipe<Recipe> & {
  ingredients: string[] | IngredientTemplate[];
  utensils: string[] | UtensilTemplate[];
  writtenTutorial: string;
  videoTutorial: string;
  macros: Macros;
  dayTemplates?: DayTemplate[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
  recipeTutorial?: RecipeTutorial;
};

export default RecipeTemplate;
