// SCSS
import entityInfoStyles from "@/scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoComponents from "./EntityInfoComponents";
import EntityMutationMenu from "@/components/shared/entity/EntityMutationMenu";
import UpsertMealPrepPlanInterface from "../create-tool/interfaces/UpsertMealPrepPlanInterface";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectLoadingGetUserMealPrepPlan } from "@/redux/slices/mealPrepPlans/selectors";
import { getUserMealPrepPlan } from "@/redux/slices/mealPrepPlans/thunks";
import { updateLoadingGetUserMealPrepPlan } from "@/redux/slices/mealPrepPlans/slice";
// Types
import EntityInfoProps from "@/core/interfaces/entity/EntityInfoProps";
// Hooks
import useNavigateToPathname from "@/hooks/useNavigateToPathname";
import useGetHandleOnDeleteEntity from "@/hooks/useGetHandleOnDeleteEntity";
import useDelayFunction from "@/hooks/useDelayFunction";
// Translations
import { useTranslations } from "next-intl";
// Next
import { useParams, useSearchParams } from "next/navigation";

const MealPrepPlanInfo: FC<EntityInfoProps> = ({
  entityId,
  userId,
  hasEntityMutationMenu = true,
}) => {
  const searchParams = useSearchParams();
  const editMode = searchParams.get("edit");
  const { id: mealPrepPlanId } = useParams();

  const dispatch = useAppDispatch();
  const loadingGetUserMealPrepPlan = useAppSelector(
    selectLoadingGetUserMealPrepPlan
  );

  const navigateToPathname = useNavigateToPathname();
  const handleOnDeleteEntity = useGetHandleOnDeleteEntity(
    "mealPrepPlan",
    entityId,
    userId
  );

  const translate = useTranslations("warningOverlay.pageInfo");

  useDelayFunction(
    () => dispatch(updateLoadingGetUserMealPrepPlan("IDLE")),
    [mealPrepPlanId],
    10
  );

  useEffect(() => {
    if (loadingGetUserMealPrepPlan === "IDLE" && userId && entityId) {
      dispatch(getUserMealPrepPlan({ userId, mealPrepPlanId: entityId }));
    }
  }, [entityId, userId, loadingGetUserMealPrepPlan]);

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
          entityType="mealPrepPlan"
          entityName={translate("mealPrepPlan")}
        />
      )}
      <div className={entityInfoStyles.entityInfoContent}>
        {editMode === "true" ? (
          <UpsertMealPrepPlanInterface interfaceType="update" />
        ) : (
          <>
            <EntityInfoDetails entityId={entityId} entityType="mealPrepPlan" />
            <EntityInfoComponents
              entityId={entityId}
              entityType="mealPrepPlan"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MealPrepPlanInfo;
