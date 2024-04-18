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
  let sectionTitleUsed = "Entities:";

  switch (entityTypeUsed) {
    case "ingredient":
      sectionTitleUsed = "Ingredients:";
      break;
    case "utensil":
      sectionTitleUsed = "Utensils:";
      break;
    case "recipe":
      sectionTitleUsed = "Recipes:";
      break;
    case "dayTemplate":
      sectionTitleUsed = "Day Templates:";
      break;
    case "instanceTemplate":
      sectionTitleUsed = "Instance Templates:";
      break;
    case "mealPrepPlan":
      sectionTitleUsed = "Meal Prep Plans:";
      break;
    default:
      break;
  }

  return (
    <div className={entityInfoStyles.entityInfoAppearancesContainer}>
      <h4 style={{ color: labelColor, fontSize: labelFontSize }}>
        {sectionTitleUsed}
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
                  entityType={entityTypeUsed}
                  isALink={true}
                  entity={entity}
                  selectedViewOption="list"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default EntityInfoAppearancesSection;
