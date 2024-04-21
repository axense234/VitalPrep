import { InstanceTemplate, MealPrepLog } from "@prisma/client";
import RecipeTemplate from "./RecipeTemplate";
import IngredientTemplate from "./IngredientTemplate";
import UtensilTemplate from "./UtensilTemplate";
import DayTemplateTemplate from "./DayTemplateTemplate";
import InstanceTemplateTemplate from "./InstanceTemplateTemplate";

type OptionalMealPrepLog<T> = {
  [K in keyof T]?: T[K];
};

type MealPrepLogTemplate = OptionalMealPrepLog<MealPrepLog> & {
  instanceTemplate: InstanceTemplateTemplate;
  dayTemplates?: DayTemplateTemplate[];
  recipes?: RecipeTemplate[];
  ingredients?: IngredientTemplate[];
  utensils?: UtensilTemplate[];
};

export default MealPrepLogTemplate;
