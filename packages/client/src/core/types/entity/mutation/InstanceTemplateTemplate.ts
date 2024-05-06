import { InstanceTemplate, Macros, MealPrepPlan } from "@prisma/client";
import RecipeTemplate from "./RecipeTemplate";
import IngredientTemplate from "./IngredientTemplate";
import UtensilTemplate from "./UtensilTemplate";
import DayTemplateTemplate from "./DayTemplateTemplate";

type OptionalInstanceTemplate<T> = {
  [K in keyof T]?: T[K];
};

type InstanceTemplateTemplate = OptionalInstanceTemplate<InstanceTemplate> & {
  dayTemplates: string[] | DayTemplateTemplate[];
  macros: Macros;
  ingredients?: IngredientTemplate[];
  utensils?: UtensilTemplate[];
  recipes?: RecipeTemplate[];
  mealPrepPlans?: MealPrepPlan[];
};

export default InstanceTemplateTemplate;
