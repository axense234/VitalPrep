import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";

interface EntityComponentProps {
  clicked: boolean;
  entityId: string;
  entity?:
    | IngredientTemplate
    | UtensilTemplate
    | RecipeTemplate
    | DayTemplateTemplate
    | InstanceTemplateTemplate
    | MealPrepPlanTemplate;
}
export default EntityComponentProps;
