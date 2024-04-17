import { DayTemplate, Macros, MealPrepPlan } from "@prisma/client";
import IngredientTemplate from "./IngredientTemplate";
import RecipeTemplate from "./RecipeTemplate";
import UtensilTemplate from "./UtensilTemplate";
import InstanceTemplateTemplate from "./InstanceTemplateTemplate";
import DayTemplateTemplate from "./DayTemplateTemplate";

type OptionalMealPrepPlan<T> = {
  [K in keyof T]?: T[K];
};

type MealPrepPlanTemplate = OptionalMealPrepPlan<MealPrepPlan> & {
  instanceTemplates: string[] | InstanceTemplateTemplate[];
  macros?: Macros;
  ingredients?: IngredientTemplate[];
  utensils?: UtensilTemplate[];
  recipes?: RecipeTemplate[];
  dayTemplates?: DayTemplateTemplate[];
};

export default MealPrepPlanTemplate;
