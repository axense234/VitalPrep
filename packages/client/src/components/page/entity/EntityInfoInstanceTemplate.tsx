// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Types
import MealPrepLogTemplate from "@/core/types/entity/mealPrepLog/MealPrepLogTemplate";
// Components
import EntityCard from "@/components/shared/entity/EntityCard";
import EntityMacros from "@/components/shared/entity/EntityMacros";
// Translations
import { useTranslations } from "next-intl";

const EntityInfoInstanceTemplate: FC<{ entityId: string }> = ({ entityId }) => {
  const entityThatHasAInstanceTemplate = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "mealPrepLog")
  ) as MealPrepLogTemplate;

  const entityInstanceTemplate =
    entityThatHasAInstanceTemplate?.instanceTemplate;

  const translate = useTranslations("entityInstanceTemplate");

  return (
    <div className={entityInfoStyles.entityInfoInstanceTemplateContainer}>
      <h4>
        {translate("sectionTitle", {
          name:
            entityThatHasAInstanceTemplate?.name ||
            translate("defaultEntityName"),
        })}
      </h4>
      <div
        className={entityInfoStyles.entityInfoInstanceTemplateContainerContent}
      >
        <EntityCard
          entity={entityInstanceTemplate}
          entityId={entityId}
          entityType="instanceTemplate"
          isALink={true}
          size="large"
        />
        <EntityMacros macros={entityInstanceTemplate?.macros} />
      </div>
    </div>
  );
};

export default EntityInfoInstanceTemplate;
