// SCSS
import entityInfoTutorialStyles from "../../../scss/components/page/EntityInfo.module.scss";
// React
import { FC } from "react";
// Types
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import EntityType from "@/core/types/entity/EntityType";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Components
import EntityCard from "@/components/shared/entity/EntityCard";

const EntityInfoComponents: FC<{
  entityId: string;
  entityType: EntityType;
}> = ({ entityType, entityId }) => {
  let entityComponents = null;
  const entity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, entityType)
  );

  switch (entityType) {
    case "recipe":
      entityComponents = (
        <div className={entityInfoTutorialStyles.entityInfoComponentsSections}>
          <EntityInfoComponentsSection
            entityType="ingredient"
            entityComponents={
              (entity as RecipeTemplate)?.ingredients as IngredientTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Ingredients"
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as RecipeTemplate)?.utensils as UtensilTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Utensils"
          />
        </div>
      );
      break;
    case "dayTemplate":
      entityComponents = (
        <div className={entityInfoTutorialStyles.entityInfoComponentsSections}>
          <EntityInfoComponentsSection
            entityType="ingredient"
            entityComponents={
              (entity as DayTemplateTemplate)
                ?.ingredients as IngredientTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Ingredients"
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as DayTemplateTemplate)?.utensils as UtensilTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Utensils"
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as DayTemplateTemplate)?.recipes as RecipeTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Recipes"
          />
        </div>
      );
      break;
    case "instanceTemplate":
      entityComponents = (
        <div className={entityInfoTutorialStyles.entityInfoComponentsSections}>
          <EntityInfoComponentsSection
            entityType="ingredient"
            entityComponents={
              (entity as InstanceTemplateTemplate)
                ?.ingredients as IngredientTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Ingredients"
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as InstanceTemplateTemplate)
                ?.utensils as UtensilTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Utensils"
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as InstanceTemplateTemplate)?.recipes as RecipeTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Recipes"
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as InstanceTemplateTemplate)
                ?.dayTemplates as DayTemplateTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Day Templates"
          />
        </div>
      );
      break;
    case "mealPrepPlan":
      entityComponents = (
        <div className={entityInfoTutorialStyles.entityInfoComponentsSections}>
          <EntityInfoComponentsSection
            entityType="ingredient"
            entityComponents={
              (entity as MealPrepPlanTemplate)
                ?.ingredients as IngredientTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Ingredients"
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as MealPrepPlanTemplate)?.utensils as UtensilTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Utensils"
          />
          <EntityInfoComponentsSection
            entityType="recipe"
            entityComponents={
              (entity as MealPrepPlanTemplate)?.recipes as RecipeTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Recipes"
          />
          <EntityInfoComponentsSection
            entityType="dayTemplate"
            entityComponents={
              (entity as MealPrepPlanTemplate)
                ?.dayTemplates as DayTemplateTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Day Templates"
          />
          <EntityInfoComponentsSection
            entityType="instanceTemplate"
            entityComponents={
              (entity as MealPrepPlanTemplate)
                ?.instanceTemplates as InstanceTemplateTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Instance Templates"
          />
        </div>
      );
      break;
    case "mealPrepLog":
      entityComponents = (
        <div className={entityInfoTutorialStyles.entityInfoComponentsSections}>
          <EntityInfoComponentsSection
            entityType="ingredient"
            entityComponents={
              (entity as MealPrepPlanTemplate)
                ?.ingredients as IngredientTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Ingredients"
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as MealPrepPlanTemplate)?.utensils as UtensilTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Utensils"
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as MealPrepPlanTemplate)?.recipes as RecipeTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Recipes"
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as MealPrepPlanTemplate)
                ?.dayTemplates as DayTemplateTemplate[]
            }
            entityName={entity?.name || "Entity Name"}
            entitiesLabel="Day Templates"
          />
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className={entityInfoTutorialStyles.entityInfoComponentsContainer}>
      <h4>Components</h4>
      {entityComponents}
    </div>
  );
};

const EntityInfoComponentsSection: FC<{
  entitiesLabel: string;
  entityName: string;
  entityType: EntityType;
  entityComponents:
    | IngredientTemplate[]
    | UtensilTemplate[]
    | RecipeTemplate[]
    | DayTemplateTemplate[]
    | InstanceTemplateTemplate[]
    | MealPrepPlanTemplate[];
}> = ({ entityName, entityComponents, entityType, entitiesLabel }) => {
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

export default EntityInfoComponents;
