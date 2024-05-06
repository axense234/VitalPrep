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
  return (
    <div className={entityPreviewStyles.entityPreviewDetailsContainer}>
      <h4>{type === "preview" ? "Preview" : entityType[0].toUpperCase()}</h4>
      <EntityCard entity={entity} entityType={entityType} entityId={entityId} />
    </div>
  );
};

export default EntityPreview;
