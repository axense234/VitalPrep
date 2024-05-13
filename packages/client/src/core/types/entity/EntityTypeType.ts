import DayTemplateType from "./dayTemplate/DayTemplateType";
import IngredientType from "./ingredient/IngredientType";
import InstanceTemplateType from "./instanceTemplate/InstanceTemplateType";
import MealPrepLogType from "./mealPrepLog/MealPrepLogType";
import MealPrepPlanType from "./mealPrepPlan/MealPrepPlanType";
import RecipeType from "./recipe/RecipeType";
import UtensilType from "./utensil/UtensilType";

type EntityTypeType =
  | IngredientType
  | UtensilType
  | RecipeType
  | DayTemplateType
  | InstanceTemplateType
  | MealPrepPlanType
  | MealPrepLogType;

export default EntityTypeType;
