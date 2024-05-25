// SCSS
import entityCardStyles from "../../../scss/components/shared/EntityCard.module.scss";
// Types
import EntityCardProps from "@/core/interfaces/entity/EntityCardProps";
// Next
import Image from "next/image";
// React
import { FC, useRef } from "react";
// Redux
import { useAppSelector } from "@/hooks/redux";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
import getEntityCardDetails from "@/helpers/getEntityCardDetails";
// Hooks
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
// Components
import EntityMutationMenu from "./EntityMutationMenu";
// Translations
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const EntityCard: FC<EntityCardProps> = ({
  entityType,
  entity,
  entityId,
  size = "large",
  isALink = false,
  hasEntityMutationMenu = true,
  deleteEntityFunction,
  updateEntityFunction,
}) => {
  const entityFromState = useAppSelector((state) =>
    selectEntityById(state, entityId || "", entityType)
  );
  const entityCardRef = useRef<HTMLDivElement | null>(null);
  const entityUsed = entity || entityFromState;

  let windowWidth = useGetWindowWidth();
  let tabletAndPhoneRedesign = windowWidth && windowWidth <= 600;

  const translateDefaultNameValues = useTranslations(
    `createTool.formLabels.${entityType}`
  );
  const translateEntityCardDetails = useTranslations(
    "entityComponents.details"
  );

  console.log(entityType, entityUsed?.userId);

  const {
    defaultImageUrlShownBasedOnEntityType,
    entityDetails,
    entitySubDetails,
  } = getEntityCardDetails(entityType, entityUsed, translateEntityCardDetails);

  if (isALink) {
    return (
      <div
        className={entityCardStyles.entityComponentWrapper}
        ref={entityCardRef}
      >
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={entityCardRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={entityUsed?.name}
            entityType={entityType}
          />
        )}
        <Link
          href={{
            pathname: `/${entityType}/[id]` as any,
            params: { id: entityId || entity?.id },
          }}
          className={entityCardStyles.entityCardLinkWrapper}
        >
          <div
            className={entityCardStyles.entityCardContainer}
            style={{
              maxWidth:
                size === "large" && !tabletAndPhoneRedesign ? "24rem" : "16rem",
            }}
          >
            <Image
              width={384}
              height={384}
              alt={
                entityUsed?.name ||
                translateDefaultNameValues("defaultNameValue")
              }
              title={
                entityUsed?.name ||
                translateDefaultNameValues("defaultNameValue")
              }
              aria-label={
                entityUsed?.name ||
                translateDefaultNameValues("defaultNameValue")
              }
              src={
                entityUsed?.imageUrl || defaultImageUrlShownBasedOnEntityType
              }
            />
            <div className={entityCardStyles.entityCardContentDetails}>
              <h5>
                {entityUsed?.name ||
                  translateDefaultNameValues("defaultNameValue")}
              </h5>
              <h6
                style={{
                  fontSize:
                    size === "large" && !tabletAndPhoneRedesign
                      ? "1.5rem"
                      : "1rem",
                }}
              >
                {entityDetails}
              </h6>
              {(entityType === "dayTemplate" ||
                entityType === "instanceTemplate" ||
                entityType === "mealPrepPlan") && (
                <h6
                  style={{
                    fontSize:
                      size === "large" && !tabletAndPhoneRedesign
                        ? "1.5rem"
                        : "1rem",
                  }}
                >
                  {entitySubDetails}
                </h6>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={entityCardStyles.entityCardContainer}
      style={{
        maxWidth:
          size === "large" && !tabletAndPhoneRedesign ? "24rem" : "16rem",
      }}
      ref={entityCardRef}
    >
      {hasEntityMutationMenu && (
        <EntityMutationMenu
          type="entityComponent"
          parentRef={entityCardRef}
          handleEntityDeletion={deleteEntityFunction}
          handleEntityModification={updateEntityFunction}
        />
      )}
      <Image
        width={384}
        height={384}
        alt={entityUsed?.name || translateDefaultNameValues("defaultNameValue")}
        title={
          entityUsed?.name || translateDefaultNameValues("defaultNameValue")
        }
        aria-label={
          entityUsed?.name || translateDefaultNameValues("defaultNameValue")
        }
        src={entityUsed?.imageUrl || defaultImageUrlShownBasedOnEntityType}
      />
      <div className={entityCardStyles.entityCardContentDetails}>
        <h5>
          {entityUsed?.name || translateDefaultNameValues("defaultNameValue")}
        </h5>
        <h6
          style={{
            fontSize:
              size === "large" && !tabletAndPhoneRedesign ? "1.5rem" : "1rem",
          }}
        >
          {entityDetails}
        </h6>
        {(entityType === "dayTemplate" ||
          entityType === "instanceTemplate" ||
          entityType === "mealPrepPlan" ||
          entityType === "mealPrepLog") && (
          <h6
            style={{
              fontSize:
                size === "large" && !tabletAndPhoneRedesign ? "1.5rem" : "1rem",
            }}
          >
            {entitySubDetails}
          </h6>
        )}
      </div>
    </div>
  );
};

export default EntityCard;
