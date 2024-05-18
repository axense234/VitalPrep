// Interfaces
import EntityDetailsProps from "@/core/interfaces/entity/EntityDetailsProps";
// React
import { FC } from "react";
// Components
import EntityCard from "./EntityCard";
// SCSS
import entityPreviewStyles from "../../../scss/components/shared/EntityPreview.module.scss";
// Translations
import { useTranslations } from "next-intl";

const EntityDetails: FC<EntityDetailsProps> = ({
  type,
  entityType,
  entity,
  entityId,
}) => {
  const translate = useTranslations("entityPreview.entityDetails");
  const viewLabel = translate(`entityLabels.${entityType}`);

  return (
    <div className={entityPreviewStyles.entityPreviewDetailsContainer}>
      <h4>{type === "preview" ? translate("title") : viewLabel}</h4>
      <EntityCard
        entity={entity}
        entityType={entityType}
        entityId={entityId}
        size="large"
        isALink={false}
      />
    </div>
  );
};

export default EntityDetails;
