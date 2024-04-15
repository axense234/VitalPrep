import EntityType from "@/core/types/entity/EntityType";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";
import { InstanceTemplate } from "@prisma/client";

type EntityInfoAppearancesSectionProps = {
  labelColor: "#DDD9D5" | "#120A06";
  labelFontSize?: number;

  areOptionsLoading: boolean;

  backgroundColor?: string;

  entities:
    | InstanceTemplate[]
    | UtensilTemplate[]
    | RecipeTemplate[]
    | DayTemplateTemplate[]
    | InstanceTemplateTemplate[]
    | MealPrepPlanTemplate[];
  entityTypeUsed: EntityType;
};

export default EntityInfoAppearancesSectionProps;
