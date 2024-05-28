// SCSS
import entityInfoStyles from "@/scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoComponents from "./EntityInfoComponents";
import UpsertMealPrepLogInterface from "../create-tool/interfaces/UpsertMealPrepLogInterface";
import EntityInfoInstanceTemplate from "./EntityInfoInstanceTemplate";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectLoadingGetUserMealPrepLog } from "@/redux/slices/mealPrepLogs/selectors";
import { getUserMealPrepLog } from "@/redux/slices/mealPrepLogs/thunks";
// Types
import EntityInfoProps from "@/core/interfaces/entity/EntityInfoProps";
// Components
import EntityMutationMenu from "@/components/shared/entity/EntityMutationMenu";
// Hooks
import useGetHandleOnDeleteEntity from "@/hooks/useGetHandleOnDeleteEntity";
import useNavigateToPathname from "@/hooks/useNavigateToPathname";
// Translations
import { useTranslations } from "next-intl";
// Next
import { useSearchParams } from "next/navigation";

const MealPrepLogInfo: FC<EntityInfoProps> = ({
  entityId,
  userId,
  hasEntityMutationMenu = true,
}) => {
  const searchParams = useSearchParams();
  const editMode = searchParams.get("edit");
  console.log(editMode);

  const dispatch = useAppDispatch();
  const loadingGetUserMealPrepLog = useAppSelector(
    selectLoadingGetUserMealPrepLog
  );

  const navigateToPathname = useNavigateToPathname();
  const handleOnDeleteEntity = useGetHandleOnDeleteEntity(
    "mealPrepLog",
    entityId,
    userId
  );

  const translate = useTranslations("warningOverlay.pageInfo");

  useEffect(() => {
    console.log(loadingGetUserMealPrepLog, userId, entityId);
    if (loadingGetUserMealPrepLog === "IDLE" && userId && entityId) {
      dispatch(getUserMealPrepLog({ userId, mealPrepLogId: entityId }));
    }
  }, [entityId, userId, loadingGetUserMealPrepLog]);

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
          entityType="mealPrepLog"
          entityName={translate("mealPrepLog")}
        />
      )}
      <div className={entityInfoStyles.entityInfoContent}>
        {editMode === "true" ? (
          <UpsertMealPrepLogInterface interfaceType="update" />
        ) : (
          <>
            <EntityInfoDetails entityId={entityId} entityType="mealPrepLog" />
            <EntityInfoInstanceTemplate entityId={entityId} />
            <EntityInfoComponents
              entityId={entityId}
              entityType="mealPrepLog"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MealPrepLogInfo;
