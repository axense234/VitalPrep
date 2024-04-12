// SCSS
import multiViewToolStyles from "../../../scss/pages/MultiViewTool.module.scss";
// Components
import EntityComponent from "@/components/shared/entity/EntityComponent";
// React
import { FC } from "react";

const MultiViewToolContent: FC<{
  entityType:
    | "ingredient"
    | "utensil"
    | "recipe"
    | "dayTemplate"
    | "instanceTemplate"
    | "mealPrepPlan";
  entityIds: string[] | undefined;
}> = ({ entityType, entityIds }) => {
  return (
    <ul className={multiViewToolStyles.multiViewEntitiesContainer}>
      {entityIds &&
        entityIds.length > 0 &&
        entityIds.map((entityId) => {
          return (
            <li key={entityId}>
              <EntityComponent
                clicked={true}
                entityType={entityType}
                entityId={entityId}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default MultiViewToolContent;
