import {
  DayTemplate,
  Ingredient,
  Macros,
  MealPrepLog,
  Recipe,
  Utensil,
} from "@prisma/client";
import OptionalEntity from "../OptionalEntityType";
import InstanceTemplateTemplate from "../instanceTemplate/InstanceTemplateTemplate";

type MealPrepLogTemplate = OptionalEntity<MealPrepLog> & {
  macros: Macros;
  ingredients?: Ingredient[];
  utensils?: Utensil[];
  recipes?: Recipe[];
  dayTemplates?: DayTemplate[];
  instanceTemplate: InstanceTemplateTemplate;
};

export default MealPrepLogTemplate;
