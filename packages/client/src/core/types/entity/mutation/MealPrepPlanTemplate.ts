import { Macros, MealPrepPlan, MealPrepPlanTiming } from "@prisma/client";
import IngredientTemplate from "./IngredientTemplate";
import RecipeTemplate from "./RecipeTemplate";
import UtensilTemplate from "./UtensilTemplate";
import InstanceTemplateTemplate from "./InstanceTemplateTemplate";
import DayTemplateTemplate from "./DayTemplateTemplate";

type OptionalMealPrepPlan<T> = {
  [K in keyof T]?: T[K];
};

type OptionalMealPrepTiming<T> = {
  [K in keyof T]?: T[K];
};

type MealPrepTimingTemplate = OptionalMealPrepTiming<MealPrepPlanTiming>;

type MealPrepPlanTemplate = OptionalMealPrepPlan<MealPrepPlan> & {
  instanceTemplates: string[] | InstanceTemplateTemplate[];
  macros?: Macros;
  ingredients?: IngredientTemplate[];
  utensils?: UtensilTemplate[];
  recipes?: RecipeTemplate[];
  dayTemplates?: DayTemplateTemplate[];
  instanceTemplatesTimings: MealPrepTimingTemplate[];
};

export default MealPrepPlanTemplate;
