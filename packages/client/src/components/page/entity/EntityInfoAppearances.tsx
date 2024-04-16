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

  console.log(entity);
  console.log(entity, entityType);

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
              backgroundColor="#8B0000"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={ingredientDayTemplates || []}
              entityTypeUsed="dayTemplate"
              labelColor="#120A06"
              labelFontSize={28}
              backgroundColor="#013310"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={ingredientInstanceTemplates || []}
              entityTypeUsed="instanceTemplate"
              labelColor="#120A06"
              labelFontSize={28}
              backgroundColor="#012433"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={ingredientMealPrepPlans || []}
              entityTypeUsed="mealPrepPlan"
              labelColor="#120A06"
              labelFontSize={28}
              backgroundColor="#42171C"
            />
          </div>
        );
        break;
      case "utensil":
        const entityAsUtensil = entity as IngredientTemplate;

        const utensilRecipes = entityAsUtensil.recipes;
        const utensilDayTemplates = entityAsUtensil.dayTemplates;
        const utensilInstanceTemplates = entityAsUtensil.instanceTemplates;
        const utensilMealPrepPlans = entityAsUtensil.mealPrepPlans;

        entityInfoAppearancesShown = (
          <div className={entityInfoStyles.entityInfoDetailsContainer}>
            <h2>Appearances</h2>
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={utensilRecipes || []}
              entityTypeUsed="recipe"
              labelColor="#120A06"
              labelFontSize={28}
              backgroundColor="#8B0000"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={utensilDayTemplates || []}
              entityTypeUsed="dayTemplate"
              labelColor="#120A06"
              labelFontSize={28}
              backgroundColor="#013310"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={utensilInstanceTemplates || []}
              entityTypeUsed="instanceTemplate"
              labelColor="#120A06"
              labelFontSize={28}
              backgroundColor="#012433"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={utensilMealPrepPlans || []}
              entityTypeUsed="mealPrepPlan"
              labelColor="#120A06"
              labelFontSize={28}
              backgroundColor="#42171C"
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
