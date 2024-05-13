// SCSS
import entityInfoTutorialStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Interfaces
import EntityInfoComponentsShownProps from "@/core/interfaces/entity/EntityInfoComponentsShownProps";
// React
import { FC } from "react";
// Components
import EntityCard from "./EntityCard";

const EntityInfoComponentsSection: FC<EntityInfoComponentsShownProps> = ({
  entityName,
  entityComponents,
  entityType,
  entitiesLabel,
}) => {
  if (!entityComponents || entityComponents.length < 1) {
    return null;
  }

  return (
    <div className={entityInfoTutorialStyles.entityInfoSection}>
      <h5 className={entityInfoTutorialStyles.entityInfoSectionH5}>
        {entitiesLabel} used in {entityName}:
      </h5>
      <ul className={entityInfoTutorialStyles.entityInfoSectionItems}>
        {entityComponents?.map((entityComponent) => {
          return (
            <li key={entityComponent.id}>
              <EntityCard
                entity={entityComponent}
                entityId={entityComponent.id}
                entityType={entityType}
                size="medium"
                isALink={true}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EntityInfoComponentsSection;
