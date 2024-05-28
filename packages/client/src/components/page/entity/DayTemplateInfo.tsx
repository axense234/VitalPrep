// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoAppearances from "./EntityInfoAppearances";
import EntityInfoComponents from "./EntityInfoComponents";
import EntityMutationMenu from "@/components/shared/entity/EntityMutationMenu";
import UpsertDayTemplateInterface from "../create-tool/interfaces/UpsertDayTemplateInterface";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectLoadingGetUserDayTemplate } from "@/redux/slices/dayTemplates/selectors";
import { getUserDayTemplate } from "@/redux/slices/dayTemplates/thunks";
// Types
import EntityInfoProps from "@/core/interfaces/entity/EntityInfoProps";
// Hooks
import useGetHandleOnDeleteEntity from "@/hooks/useGetHandleOnDeleteEntity";
import useNavigateToPathname from "@/hooks/useNavigateToPathname";
// Translations
import { useTranslations } from "next-intl";
// Next
import { useSearchParams } from "next/navigation";

const DayTemplateInfo: FC<EntityInfoProps> = ({
  entityId,
  userId,
  hasEntityMutationMenu = true,
}) => {
  const searchParams = useSearchParams();
  const editMode = searchParams.get("edit");
  console.log(editMode);

  const dispatch = useAppDispatch();
  const loadingGetUserDayTemplate = useAppSelector(
    selectLoadingGetUserDayTemplate
  );

  const navigateToPathname = useNavigateToPathname();
  const handleOnDeleteEntity = useGetHandleOnDeleteEntity(
    "dayTemplate",
    entityId,
    userId
  );

  const translate = useTranslations("warningOverlay.pageInfo");

  useEffect(() => {
    console.log(loadingGetUserDayTemplate, userId, entityId);
    if (loadingGetUserDayTemplate === "IDLE" && userId && entityId) {
      dispatch(getUserDayTemplate({ userId, dayTemplateId: entityId }));
    }
  }, [entityId, userId, loadingGetUserDayTemplate]);

  return (
    <div className={entityInfoStyles.entityInfoContainer}>
      <PageTitle />
      {hasEntityMutationMenu && (
        <EntityMutationMenu
          type="entityInfo"
          handleEntityDeletion={handleOnDeleteEntity}
          handleEntityModification={() =>
            navigateToPathname({ forcedQueryParams: { edit: "true" } })
          }
          handleEntityViewing={() =>
            navigateToPathname({ forcedQueryParams: {} })
          }
          entityType="dayTemplate"
          entityName={translate("dayTemplate")}
        />
      )}
      <div className={entityInfoStyles.entityInfoContent}>
        {editMode === "true" ? (
          <UpsertDayTemplateInterface interfaceType="update" />
        ) : (
          <>
            <EntityInfoDetails entityId={entityId} entityType="dayTemplate" />
            <EntityInfoComponents
              entityId={entityId}
              entityType="dayTemplate"
            />
            <EntityInfoAppearances
              entityId={entityId}
              entityType="dayTemplate"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DayTemplateInfo;
