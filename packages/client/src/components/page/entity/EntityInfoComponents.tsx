// SCSS
import entityInfoTutorialStyles from "../../../scss/components/page/EntityInfo.module.scss";
// React
import { FC } from "react";
// Types
import RecipeTemplate from "@/core/types/entity/recipe/RecipeTemplate";
import EntityType from "@/core/types/entity/users/EntityType";
import IngredientTemplate from "@/core/types/entity/ingredient/IngredientTemplate";
import DayTemplateTemplate from "@/core/types/entity/dayTemplate/DayTemplateTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
import UtensilTemplate from "@/core/types/entity/utensil/UtensilTemplate";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Components
import EntityInfoComponentsSection from "@/components/shared/entity/EntityInfoComponentsSection";
// Translations
import { useTranslations } from "next-intl";

const EntityInfoComponents: FC<{
  entityId: string;
  entityType: EntityType;
}> = ({ entityType, entityId }) => {
  let entityComponents = null;
  const entity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, entityType)
  );

  const translate = useTranslations("entityComponents");

  switch (entityType) {
    case "recipe":
      entityComponents = (
        <div className={entityInfoTutorialStyles.entityInfoComponentsSections}>
          <EntityInfoComponentsSection
            entityType="ingredient"
            entityComponents={
              (entity as RecipeTemplate)?.ingredients as IngredientTemplate[]
            }
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as RecipeTemplate)?.utensils as UtensilTemplate[]
            }
            entityName={entity?.name}
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
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as DayTemplateTemplate)?.utensils as UtensilTemplate[]
            }
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="recipe"
            entityComponents={
              (entity as DayTemplateTemplate)?.recipes as RecipeTemplate[]
            }
            entityName={entity?.name}
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
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as InstanceTemplateTemplate)
                ?.utensils as UtensilTemplate[]
            }
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="recipe"
            entityComponents={
              (entity as InstanceTemplateTemplate)?.recipes as RecipeTemplate[]
            }
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="dayTemplate"
            entityComponents={
              (entity as InstanceTemplateTemplate)
                ?.dayTemplates as DayTemplateTemplate[]
            }
            entityName={entity?.name}
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
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as MealPrepPlanTemplate)?.utensils as UtensilTemplate[]
            }
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="recipe"
            entityComponents={
              (entity as MealPrepPlanTemplate)?.recipes as RecipeTemplate[]
            }
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="dayTemplate"
            entityComponents={
              (entity as MealPrepPlanTemplate)
                ?.dayTemplates as DayTemplateTemplate[]
            }
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="instanceTemplate"
            entityComponents={
              (entity as MealPrepPlanTemplate)
                ?.instanceTemplates as InstanceTemplateTemplate[]
            }
            entityName={entity?.name}
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
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="utensil"
            entityComponents={
              (entity as MealPrepPlanTemplate)?.utensils as UtensilTemplate[]
            }
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="recipe"
            entityComponents={
              (entity as MealPrepPlanTemplate)?.recipes as RecipeTemplate[]
            }
            entityName={entity?.name}
          />
          <EntityInfoComponentsSection
            entityType="dayTemplate"
            entityComponents={
              (entity as MealPrepPlanTemplate)
                ?.dayTemplates as DayTemplateTemplate[]
            }
            entityName={entity?.name}
          />
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className={entityInfoTutorialStyles.entityInfoComponentsContainer}>
      <h4>{translate("title")}</h4>
      {entityComponents}
    </div>
  );
};

export default EntityInfoComponents;
