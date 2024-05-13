import DayTemplateTemplate from "./dayTemplate/DayTemplateTemplate";
import IngredientTemplate from "./ingredient/IngredientTemplate";
import InstanceTemplateTemplate from "./instanceTemplate/InstanceTemplateTemplate";
import MealPrepLogTemplate from "./mealPrepLog/MealPrepLogTemplate";
import MealPrepPlanTemplate from "./mealPrepPlan/MealPrepPlanTemplate";
import RecipeTemplate from "./recipe/RecipeTemplate";
import UtensilTemplate from "./utensil/UtensilTemplate";

type EntityTemplateType =
  | UtensilTemplate
  | IngredientTemplate
  | RecipeTemplate
  | DayTemplateTemplate
  | InstanceTemplateTemplate
  | MealPrepPlanTemplate
  | MealPrepLogTemplate;

export default EntityTemplateType;
