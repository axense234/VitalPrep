// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Types
import EntityInfoAppearancesSectionProps from "@/core/interfaces/entity/EntityInfoAppearancesSection";
// Components
import EntityComponent from "@/components/shared/entity/EntityComponent";
// React Spinners
import { ClockLoader } from "react-spinners";

const EntityInfoAppearancesSection: FC<EntityInfoAppearancesSectionProps> = ({
  areOptionsLoading,
  entities,
  entityTypeUsed,
  labelColor,
  backgroundColor,
  labelFontSize,
}) => {
  let entityInfoAppearancesSectionShown = null;
  switch (entityTypeUsed) {
    case "recipe":
      entityInfoAppearancesSectionShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <h4 style={{ color: labelColor, fontSize: labelFontSize }}>
            Recipes:
          </h4>
          {areOptionsLoading ? (
            <ClockLoader />
          ) : (
            <ul
              className={entityInfoStyles.entityInfoAppearancesSectionEntities}
              style={{ backgroundColor: backgroundColor }}
            >
              {entities?.map((entity) => {
                return (
                  <li key={entity.id}>
                    <EntityComponent
                      clicked={true}
                      entityId=""
                      entityType="recipe"
                      isALink={true}
                      entity={entity}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );
      break;
    case "dayTemplate":
      entityInfoAppearancesSectionShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <h4 style={{ color: labelColor, fontSize: labelFontSize }}>
            Day Templates:
          </h4>
          {areOptionsLoading ? (
            <ClockLoader />
          ) : (
            <ul
              className={entityInfoStyles.entityInfoAppearancesSectionEntities}
              style={{ backgroundColor: backgroundColor }}
            >
              {entities?.map((entity) => {
                return (
                  <li key={entity.id}>
                    <EntityComponent
                      clicked={true}
                      entityId=""
                      entityType="dayTemplate"
                      isALink={true}
                      entity={entity}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );
      break;
    default:
      break;
  }
  return entityInfoAppearancesSectionShown;
};

export default EntityInfoAppearancesSection;
