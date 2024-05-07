// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Types
import EntityType from "@/core/types/entity/EntityType";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
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
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <h4>Appearances</h4>
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={ingredientRecipes || []}
              entityTypeUsed="recipe"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={ingredientDayTemplates || []}
              entityTypeUsed="dayTemplate"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={ingredientInstanceTemplates || []}
              entityTypeUsed="instanceTemplate"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={ingredientMealPrepPlans || []}
              entityTypeUsed="mealPrepPlan"
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
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <h4>Appearances</h4>
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={utensilRecipes || []}
              entityTypeUsed="recipe"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={utensilDayTemplates || []}
              entityTypeUsed="dayTemplate"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={utensilInstanceTemplates || []}
              entityTypeUsed="instanceTemplate"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={utensilMealPrepPlans || []}
              entityTypeUsed="mealPrepPlan"
            />
          </div>
        );
        break;
      case "recipe":
        const entityAsRecipe = entity as RecipeTemplate;

        const recipeDayTemplates = entityAsRecipe.dayTemplates;
        const recipeInstanceTemplates = entityAsRecipe.instanceTemplates;
        const recipeMealPrepPlans = entityAsRecipe.mealPrepPlans;

        entityInfoAppearancesShown = (
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <h4>Appearances</h4>
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={recipeDayTemplates || []}
              entityTypeUsed="dayTemplate"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={recipeInstanceTemplates || []}
              entityTypeUsed="instanceTemplate"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={recipeMealPrepPlans || []}
              entityTypeUsed="mealPrepPlan"
            />
          </div>
        );
        break;
      case "dayTemplate":
        const entityAsDayTemplate = entity as DayTemplateTemplate;

        const dayTemplateInstanceTemplates =
          entityAsDayTemplate.instanceTemplates;
        const dayTemplateMealPrepPlans = entityAsDayTemplate.mealPrepPlans;

        entityInfoAppearancesShown = (
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <h4>Appearances</h4>
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={dayTemplateInstanceTemplates || []}
              entityTypeUsed="instanceTemplate"
            />
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={dayTemplateMealPrepPlans || []}
              entityTypeUsed="mealPrepPlan"
            />
          </div>
        );
        break;
      case "instanceTemplate":
        const entityAsInstanceTemplate = entity as InstanceTemplateTemplate;

        const instanceTemplateMealPrepPlans =
          entityAsInstanceTemplate.mealPrepPlans;

        entityInfoAppearancesShown = (
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <h4>Appearances</h4>
            <EntityInfoAppearancesSection
              areOptionsLoading={false}
              entities={instanceTemplateMealPrepPlans || []}
              entityTypeUsed="mealPrepPlan"
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
