// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Types
import EntityType from "@/core/types/entity/EntityType";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
// Components
import EntityInfoAppearancesSection from "./EntityInfoAppearancesSection";

const EntityInfoAppearances: FC<{
  entityId: string;
  entityType: EntityType;
}> = ({ entityId, entityType }) => {
  let entityInfoAppearancesShown = null;
  const entity = useAppSelector((state) =>
    selectEntityById(state, entityId, entityType)
  );

  if (entity) {
    switch (entityType) {
      case "ingredient":
        const entityAsIngredient = entity as IngredientTemplate;

        const ingredientRecipes = entityAsIngredient.recipes;
        const ingredientDayTemplates = entityAsIngredient.dayTemplates;
        const ingredientInstanceTemplates =
          entityAsIngredient.instanceTemplates;
        const ingredientMealPrepPlans = entityAsIngredient.mealPrepPlans;

        entityInfoAppearancesShown = (
          <div className={entityInfoStyles.entityInfoDetailsContainer}>
            <h2>Appearances</h2>
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={ingredientRecipes || []}
              entityTypeUsed="recipe"
              labelColor="#120A06"
              labelFontSize={28}
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={ingredientDayTemplates || []}
              entityTypeUsed="dayTemplate"
              labelColor="#120A06"
              labelFontSize={28}
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={ingredientInstanceTemplates || []}
              entityTypeUsed="instanceTemplate"
              labelColor="#120A06"
              labelFontSize={28}
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={ingredientMealPrepPlans || []}
              entityTypeUsed="mealPrepPlan"
              labelColor="#120A06"
              labelFontSize={28}
            />
          </div>
        );
        break;
      default:
        break;
    }
  }
  return entityInfoAppearancesShown;
};

export default EntityInfoAppearances;
