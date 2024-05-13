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
import OptionalEntity from "../OptionalEntityType";
import RecipeTutorialTemplate from "./RecipeTutorialTemplate";

type RecipeTemplate = OptionalEntity<Recipe> & {
  ingredients: string[] | Ingredient[];
  utensils: string[] | Utensil[];

  recipeTutorial?: RecipeTutorialTemplate;

  macros: Macros;

  dayTemplates?: DayTemplate[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
  mealPrepLogs?: MealPrepLog[];
};

export default RecipeTemplate;
