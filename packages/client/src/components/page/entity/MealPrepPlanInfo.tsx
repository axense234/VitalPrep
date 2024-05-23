// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoComponents from "./EntityInfoComponents";
import EntityMutationMenu from "@/components/shared/entity/EntityMutationMenu";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getUserMealPrepPlan,
  selectLoadingGetUserMealPrepPlan,
} from "@/redux/slices/mealPrepPlansSlice";
// Types
import EntityInfoProps from "@/core/interfaces/entity/EntityInfoProps";
// Hooks
import useNavigateToPathname from "@/hooks/useNavigateToPathname";
import useGetHandleOnDeleteEntity from "@/hooks/useGetHandleOnDeleteEntity";
// Translations
import { useTranslations } from "next-intl";

const MealPrepPlanInfo: FC<EntityInfoProps> = ({
  entityId,
  userId,
  hasEntityMutationMenu = true,
}) => {
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

  useEffect(() => {
    console.log(loadingGetUserMealPrepPlan, userId, entityId);
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
          handleEntityModification={() => navigateToPathname({})}
          entityType="mealPrepPlan"
          entityName={translate("mealPrepPlan")}
        />
      )}
      <div className={entityInfoStyles.entityInfoContent}>
        <EntityInfoDetails entityId={entityId} entityType="mealPrepPlan" />
        <EntityInfoComponents entityId={entityId} entityType="mealPrepPlan" />
      </div>
    </div>
  );
};

export default MealPrepPlanInfo;
