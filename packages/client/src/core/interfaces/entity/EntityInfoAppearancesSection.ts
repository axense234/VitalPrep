import EntityType from "@/core/types/entity/users/EntityType";
import DayTemplateTemplate from "@/core/types/entity/dayTemplate/DayTemplateTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
import RecipeTemplate from "@/core/types/entity/recipe/RecipeTemplate";
import UtensilTemplate from "@/core/types/entity/utensil/UtensilTemplate";
import { InstanceTemplate } from "@prisma/client";

type EntityInfoAppearancesSectionProps = {
  areOptionsLoading: boolean;
  entities?:
    | InstanceTemplate[]
    | UtensilTemplate[]
    | RecipeTemplate[]
    | DayTemplateTemplate[]
    | InstanceTemplateTemplate[]
    | MealPrepPlanTemplate[];
  entityTypeUsed: EntityType;
};

export default EntityInfoAppearancesSectionProps;
