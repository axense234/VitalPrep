// React
import { FC } from "react";
// SCSS
import entityPreviewStyles from "../../../scss/components/shared/EntityPreview.module.scss";
// Types
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import MealPrepLogTemplate from "@/core/types/entity/mutation/MealPrepLogTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";
import EntityType from "@/core/types/entity/EntityType";
// Components
import EntityCard from "./EntityCard";
import EntityMacros from "./EntityMacros";

const EntityPreview: FC<{
  type: "preview" | "view";
  entityType: EntityType;
  entity:
    | IngredientTemplate
    | UtensilTemplate
    | RecipeTemplate
    | DayTemplateTemplate
    | InstanceTemplateTemplate
    | MealPrepPlanTemplate
    | MealPrepLogTemplate;
  entityId?: string;
}> = ({ entity, entityId, entityType, type }) => {
  return (
    <section className={entityPreviewStyles.entityPreviewContainer}>
      <EntityDetails
        type={type}
        entityType={entityType}
        entity={entity}
        entityId={entityId}
      />
      {entityType !== "utensil" && (
        <EntityMacros macros={(entity as IngredientTemplate)?.macros} />
      )}
    </section>
  );
};

const EntityDetails: FC<{
  type: "preview" | "view";
  entityType: EntityType;
  entity:
    | IngredientTemplate
    | UtensilTemplate
    | RecipeTemplate
    | DayTemplateTemplate
    | InstanceTemplateTemplate
    | MealPrepPlanTemplate
    | MealPrepLogTemplate;
  entityId?: string;
}> = ({ type, entityType, entity, entityId }) => {
  let viewLabel = "Ingredient";
  switch (entityType) {
    case "ingredient":
      viewLabel = "Ingredient";
      break;
    case "utensil":
      viewLabel = "Utensil";
      break;
    case "recipe":
      viewLabel = "Recipe";
      break;
    case "dayTemplate":
      viewLabel = "Day Template";
      break;
    case "instanceTemplate":
      viewLabel = "Instance Template";
      break;
    case "mealPrepPlan":
      viewLabel = "Meal Prep Plan";
      break;
    default:
      break;
  }

  return (
    <div className={entityPreviewStyles.entityPreviewDetailsContainer}>
      <h4>{type === "preview" ? "Preview" : viewLabel}</h4>
      <EntityCard
        entity={entity}
        entityType={entityType}
        entityId={entityId}
        size="large"
        isALink={false}
      />
    </div>
  );
};

export default EntityPreview;
