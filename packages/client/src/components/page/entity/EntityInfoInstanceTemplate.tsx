// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Types
import MealPrepLogTemplate from "@/core/types/entity/mealPrepLog/MealPrepLogTemplate";
// Components
import EntityCard from "@/components/shared/entity/EntityCard";
import EntityMacros from "@/components/shared/entity/EntityMacros";
// Translations
import { useTranslations } from "next-intl";
// Helpers
import getDeleteEntityFunction from "@/helpers/getDeleteEntityFunction";
// Hooks
import useNavigateToPathname from "@/hooks/useNavigateToPathname";

const EntityInfoInstanceTemplate: FC<{ entityId: string }> = ({ entityId }) => {
  const dispatch = useAppDispatch();
  const entityThatHasAInstanceTemplate = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "mealPrepLog")
  ) as MealPrepLogTemplate;

  const entityInstanceTemplate =
    entityThatHasAInstanceTemplate?.instanceTemplate;

  const translate = useTranslations("entityInstanceTemplate");

  const navigateToPathname = useNavigateToPathname();

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
          hasEntityMutationMenu={true}
          deleteEntityFunction={getDeleteEntityFunction(
            "instanceTemplate",
            dispatch,
            entityInstanceTemplate.id as string,
            entityInstanceTemplate.userId as string
          )}
          updateEntityFunction={() => navigateToPathname()}
        />
        <EntityMacros macros={entityInstanceTemplate?.macros} />
      </div>
    </div>
  );
};

export default EntityInfoInstanceTemplate;
