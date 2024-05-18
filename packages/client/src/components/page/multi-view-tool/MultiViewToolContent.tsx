// SCSS
import multiViewToolStyles from "../../../scss/pages/MultiViewTool.module.scss";
// Components
import EntityComponent from "@/components/shared/entity/EntityComponent";
// React
import { FC } from "react";
// Types
import EntityType from "@/core/types/entity/users/EntityType";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectSelectedViewOption } from "@/redux/slices/generalSlice";
// Hooks
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
// Translations
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const MultiViewToolContent: FC<{
  entityType: EntityType;
  entityIds: string[] | undefined;
}> = ({ entityType, entityIds }) => {
  const selectedViewOption = useAppSelector(selectSelectedViewOption);
  const translate = useTranslations("multiViewPage");

  const multiViewToolContentTitle = translate(`entitiesTitle.${entityType}`);
  const listItemMaxWidthBasedOnWindowWidth =
    useGetListItemMaxWidthBasedOnWindowWidth();

  return (
    <div className={multiViewToolStyles.multiViewEntitiesWrapper}>
      <h2>{multiViewToolContentTitle}</h2>
      <ul
        className={multiViewToolStyles.multiViewEntitiesContainer}
        style={{
          flexDirection: selectedViewOption === "grid" ? "row" : "column",
        }}
      >
        {entityIds && entityIds.length > 0 ? (
          entityIds.map((entityId) => {
            return (
              <li
                key={entityId}
                style={{
                  maxWidth:
                    selectedViewOption === "grid"
                      ? listItemMaxWidthBasedOnWindowWidth
                      : "100%",
                  width:
                    selectedViewOption === "grid"
                      ? listItemMaxWidthBasedOnWindowWidth
                      : "100%",
                }}
              >
                <EntityComponent
                  clicked={true}
                  entityType={entityType}
                  entityId={entityId}
                  isALink={true}
                />
              </li>
            );
          })
        ) : (
          <p className={multiViewToolStyles.multiViewEntitiesNoEntitiesMessage}>
            {translate("noEntitiesCase.message", {
              title: multiViewToolContentTitle,
            })}
            <Link
              href="/create-tool"
              title={translate("noEntitiesCase.messageLinkTitle")}
              aria-label={translate("noEntitiesCase.messageLinkTitle")}
            >
              {translate("noEntitiesCase.messageLinkLabel")}
            </Link>
            .
          </p>
        )}
      </ul>
    </div>
  );
};

const useGetListItemMaxWidthBasedOnWindowWidth = () => {
  let windowWidth = useGetWindowWidth();
  let listItemMaxWidthBasedOnWindowWidth = "20%";
  if (windowWidth && windowWidth <= 1600) {
    listItemMaxWidthBasedOnWindowWidth = "30%";
  }
  if (windowWidth && windowWidth <= 1150) {
    listItemMaxWidthBasedOnWindowWidth = "45%";
  }
  if (windowWidth && windowWidth <= 875) {
    listItemMaxWidthBasedOnWindowWidth = "100%";
  }
  return listItemMaxWidthBasedOnWindowWidth;
};

export default MultiViewToolContent;
