import {
  DayTemplate,
  InstanceTemplate,
  Macros,
  MealPrepPlan,
} from "@prisma/client";
import IngredientTemplate from "./IngredientTemplate";
import UtensilTemplate from "./UtensilTemplate";
import RecipeTemplate from "./RecipeTemplate";

type OptionalDayTemplate<T> = {
  [K in keyof T]?: T[K];
};

type DayTemplateTemplate = OptionalDayTemplate<DayTemplate> & {
  recipes: string[] | RecipeTemplate[];
  macros: Macros;
  ingredients?: IngredientTemplate[];
  utensils?: UtensilTemplate[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
};

export default DayTemplateTemplate;
