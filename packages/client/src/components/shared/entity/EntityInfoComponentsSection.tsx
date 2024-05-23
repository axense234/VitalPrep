// SCSS
import entityInfoTutorialStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Interfaces
import EntityInfoComponentsShownProps from "@/core/interfaces/entity/EntityInfoComponentsShownProps";
// React
import { FC } from "react";
// Components
import EntityCard from "./EntityCard";
// Translations
import { useTranslations } from "next-intl";
// Helpers
import getDeleteEntityFunction from "@/helpers/getDeleteEntityFunction";
// Redux
import { useAppDispatch } from "@/hooks/redux";
// Hooks
import useNavigateToPathname from "@/hooks/useNavigateToPathname";

const EntityInfoComponentsSection: FC<EntityInfoComponentsShownProps> = ({
  entityName,
  entityComponents,
  entityType,
}) => {
  const dispatch = useAppDispatch();
  const translateEntitiesLabels = useTranslations(
    `multiViewPage.entitiesTitle`
  );
  const translate = useTranslations("entityComponents");

  const navigateToPathname = useNavigateToPathname();

  if (!entityComponents || entityComponents.length < 1) {
    return null;
  }

  return (
    <div className={entityInfoTutorialStyles.entityInfoSection}>
      <h5 className={entityInfoTutorialStyles.entityInfoSectionH5}>
        {translate("sectionTitle", {
          type: translateEntitiesLabels(entityType),
          name: entityName || translate("defaultEntityName"),
        })}
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
                hasEntityMutationMenu={true}
                deleteEntityFunction={getDeleteEntityFunction(
                  entityType,
                  dispatch,
                  entityComponent.id as string,
                  entityComponent.userId as string
                )}
                updateEntityFunction={() => navigateToPathname({})}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EntityInfoComponentsSection;
