// Interfaces
import EntityDetailsProps from "@/core/interfaces/entity/EntityDetailsProps";
// Types
import EntityType from "@/core/types/entity/users/EntityType";
// React
import { FC } from "react";
// Components
import EntityCard from "./EntityCard";
// SCSS
import entityPreviewStyles from "../../../scss/components/shared/EntityPreview.module.scss";

const EntityDetails: FC<EntityDetailsProps> = ({
  type,
  entityType,
  entity,
  entityId,
}) => {
  const viewLabel = useChooseEntityDetailsLabel(entityType);

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

const useChooseEntityDetailsLabel = (entityType: EntityType) => {
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
    case "mealPrepLog":
      viewLabel = "Meal Prep Log";
      break;
    default:
      throw new Error("Invalid entity type!");
  }
  return viewLabel;
};

export default EntityDetails;
