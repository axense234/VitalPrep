import {
  DayTemplate,
  Ingredient,
  InstanceTemplate,
  MealPrepPlan,
  Recipe,
  Utensil,
} from "@prisma/client";
import { MouseEventHandler } from "react";

export default interface SelectFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;
  labelFontSize?: number;

  areOptionsLoading: boolean;

  entityTypeUsed:
    | "ingredient"
    | "utensil"
    | "recipe"
    | "dayTemplate"
    | "instanceTemplate"
    | "mealPrepPlan";
  required: boolean;

  entityProperty: string[];
  onEntityPropertyValueChange: MouseEventHandler<HTMLLIElement> | undefined;
}
