// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Types
import EntityInfoAppearancesSectionProps from "@/core/interfaces/entity/EntityInfoAppearancesSection";
import EntityType from "@/core/types/entity/users/EntityType";
// Components
import EntityComponent from "@/components/shared/entity/EntityComponent";
// React Spinners
import { ClockLoader } from "react-spinners";

const EntityInfoAppearancesSection: FC<EntityInfoAppearancesSectionProps> = ({
  areOptionsLoading,
  entities,
  entityTypeUsed,
}) => {
  if (!entities || entities?.length < 1) {
    return null;
  }

  const sectionTitleUsed =
    useChooseEntityInfoAppearancesSectionTitle(entityTypeUsed);

  return (
    <div className={entityInfoStyles.entityInfoAppearancesContainer}>
      <h5>{sectionTitleUsed}</h5>
      {areOptionsLoading ? (
        <ClockLoader />
      ) : (
        <ul className={entityInfoStyles.entityInfoAppearancesSectionEntities}>
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

const useChooseEntityInfoAppearancesSectionTitle = (entityType: EntityType) => {
  let sectionTitleUsed = "Entities:";
  switch (entityType) {
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
    case "mealPrepLog":
      sectionTitleUsed = "Meal Prep Logs:";
      break;
    default:
      throw new Error("Invalid entity type!");
  }
  return sectionTitleUsed;
};

export default EntityInfoAppearancesSection;
