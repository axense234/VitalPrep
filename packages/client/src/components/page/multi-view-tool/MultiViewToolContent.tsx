// SCSS
import multiViewToolStyles from "../../../scss/pages/MultiViewTool.module.scss";
// Components
import EntityComponent, {
  EntityType,
} from "@/components/shared/entity/EntityComponent";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
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
  entityIds: string[];
}> = ({ entityType, entityIds }) => {
  return (
    <ul className={multiViewToolStyles.multiViewEntitiesContainer}>
      {entityIds?.map((entityId) => {
        return (
          <li key={entityId}>
            <EntityComponent
              clicked={true}
              entity={selectEntityById(entityId, entityType) as EntityType}
              entityType={entityType}
              id={entityId}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default MultiViewToolContent;
