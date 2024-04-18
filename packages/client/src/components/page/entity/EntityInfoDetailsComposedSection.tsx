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
import EntityCard from "../../shared/entity/EntityCard";
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

  const buildEntityLinkDestination = (entityId: string) => {
    return `/${entityType}/${entityId}`;
  };

  switch (entityType) {
    case "ingredient":
      entityInfoDetailsComposedSectionTitle = "Ingredients Used";
      break;
    case "utensil":
      entityInfoDetailsComposedSectionTitle = "Utensils Used";
      break;
    case "recipe":
      entityInfoDetailsComposedSectionTitle = "Recipes Used";
      break;
    case "dayTemplate":
      entityInfoDetailsComposedSectionTitle = "Day Templates Used";
      break;
    case "instanceTemplate":
      entityInfoDetailsComposedSectionTitle = "Instance Templates Used";
      break;
    case "mealPrepPlan":
      entityInfoDetailsComposedSectionTitle = "Meal Prep Plans Used";
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
                <EntityCard entity={entity} entityType={entityType} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EntityInfoDetailsComposedSection;
