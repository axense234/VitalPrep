// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Types
import EntityType from "@/core/types/entity/EntityType";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";
// Components
import EntityInfoDetailsComposedSectionEntityCard from "./EntityInfoDetailsComposedSectionEntityCard";
// Next
import Link from "next/link";

const EntityInfoDetailsComposedSection: FC<{
  entityType: EntityType;
  entities:
    | IngredientTemplate[]
    | UtensilTemplate[]
    | RecipeTemplate[]
    | DayTemplateTemplate[]
    | InstanceTemplateTemplate[]
    | MealPrepPlanTemplate[];
}> = ({ entities, entityType }) => {
  let entityInfoDetailsComposedSectionTitle = null;
  let entityInfoDetailsComposedSectionBackgroundColor = undefined;
  let entityInfoDetailsComposedSectionLabelColor = undefined;

  const buildEntityLinkDestination = (entityId: string) => {
    return `/${entityType}/${entityId}`;
  };

  switch (entityType) {
    case "ingredient":
      entityInfoDetailsComposedSectionTitle = "Ingredients Used";
      entityInfoDetailsComposedSectionBackgroundColor = "#FFAE00";
      entityInfoDetailsComposedSectionLabelColor = "#120A06";
      break;
    case "utensil":
      entityInfoDetailsComposedSectionTitle = "Utensils Used";
      entityInfoDetailsComposedSectionBackgroundColor = "#FF6000";
      entityInfoDetailsComposedSectionLabelColor = "#120A06";
      break;
    case "recipe":
      entityInfoDetailsComposedSectionTitle = "Recipes Used";
      entityInfoDetailsComposedSectionBackgroundColor = "#8B0000";
      entityInfoDetailsComposedSectionLabelColor = "#DDD9D5";
      break;
    case "dayTemplate":
      entityInfoDetailsComposedSectionTitle = "Day Templates Used";
      entityInfoDetailsComposedSectionBackgroundColor = "#013310";
      entityInfoDetailsComposedSectionLabelColor = "#DDD9D5";
      break;
    case "instanceTemplate":
      entityInfoDetailsComposedSectionTitle = "Instance Templates Used";
      entityInfoDetailsComposedSectionBackgroundColor = "#012433";
      entityInfoDetailsComposedSectionLabelColor = "#DDD9D5";
      break;
    case "mealPrepPlan":
      entityInfoDetailsComposedSectionTitle = "Meal Prep Plans Used";
      entityInfoDetailsComposedSectionBackgroundColor = "#42171C";
      entityInfoDetailsComposedSectionLabelColor = "#DDD9D5";
      break;
    default:
      break;
  }

  return (
    <div className={entityInfoStyles.entityInfoDetailsComposedSectionContainer}>
      <h3>{entityInfoDetailsComposedSectionTitle}</h3>
      <ul className={entityInfoStyles.entityInfoDetailsComposedSectionEntities}>
        {entities?.map((entity) => {
          return (
            <li key={entity.id}>
              <Link
                href={buildEntityLinkDestination(entity.id as string)}
                title="View More"
                aria-label="View More"
              >
                <EntityInfoDetailsComposedSectionEntityCard
                  entity={entity}
                  entityType={entityType}
                  backgroundColor={
                    entityInfoDetailsComposedSectionBackgroundColor
                  }
                  labelColor={entityInfoDetailsComposedSectionLabelColor}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EntityInfoDetailsComposedSection;
