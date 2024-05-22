// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Types
import EntityInfoAppearancesSectionProps from "@/core/interfaces/entity/EntityInfoAppearancesSection";
// Components
import EntityComponent from "@/components/shared/entity/EntityComponent";
// React Spinners
import { ClockLoader } from "react-spinners";
// Translations
import { useTranslations } from "next-intl";

const EntityInfoAppearancesSection: FC<EntityInfoAppearancesSectionProps> = ({
  areOptionsLoading,
  entities,
  entityTypeUsed,
}) => {
  if (!entities || entities?.length < 1) {
    return null;
  }
  const translate = useTranslations(`entityAppearances.${entityTypeUsed}`);

  const sectionTitleUsed = translate("sectionTitle");

  return (
    <div className={entityInfoStyles.entityInfoAppearancesContainer}>
      <h5>{sectionTitleUsed}</h5>
      {areOptionsLoading ? (
        <ClockLoader />
      ) : (
        <ul className={entityInfoStyles.entityInfoAppearancesSectionEntities}>
          {entities?.map((entity, index) => {
            return (
              <li key={entity.id}>
                <EntityComponent
                  clicked={true}
                  entityId=""
                  entityType={entityTypeUsed}
                  isALink={true}
                  entity={entity}
                  selectedViewOption="list"
                  hasEntityMutationMenu={index !== 0}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default EntityInfoAppearancesSection;
