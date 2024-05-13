// React
import { FC } from "react";
// SCSS
import entityPreviewStyles from "../../../scss/components/shared/EntityPreview.module.scss";
// Types
import IngredientTemplate from "@/core/types/entity/ingredient/IngredientTemplate";
import EntityPreviewProps from "@/core/interfaces/entity/EntityPreviewProps";
import MealPrepLogTemplate from "@/core/types/entity/mealPrepLog/MealPrepLogTemplate";
// Components
import EntityMacros from "./EntityMacros";
import EntityDetails from "./EntityDetails";

const EntityPreview: FC<EntityPreviewProps> = ({
  entity,
  entityId,
  entityType,
  type,
}) => {
  return (
    <section className={entityPreviewStyles.entityPreviewContainer}>
      <EntityDetails
        type={type}
        entityType={entityType}
        entity={entity}
        entityId={entityId}
      />
      {entityType === "mealPrepLog" && (
        <EntityMacros
          macros={(entity as MealPrepLogTemplate)?.instanceTemplate?.macros}
        />
      )}
      {entityType !== "utensil" && entityType !== "mealPrepLog" && (
        <EntityMacros macros={(entity as IngredientTemplate)?.macros} />
      )}
    </section>
  );
};

export default EntityPreview;
