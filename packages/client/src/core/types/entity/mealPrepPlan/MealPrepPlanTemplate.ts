import {
  DayTemplate,
  Ingredient,
  InstanceTemplate,
  Macros,
  MealPrepPlan,
  MealPrepPlanTiming,
  Recipe,
  Utensil,
} from "@prisma/client";
import OptionalEntity from "../OptionalEntityType";

type MealPrepPlanTemplate = OptionalEntity<MealPrepPlan> & {
  macros: Macros;
  ingredients?: Ingredient[];
  utensils?: Utensil[];
  recipes?: Recipe[];
  dayTemplates?: DayTemplate[];
  instanceTemplates?: string[] | InstanceTemplate[];
  instanceTemplatesTimings: MealPrepPlanTiming[];
};

export default MealPrepPlanTemplate;
