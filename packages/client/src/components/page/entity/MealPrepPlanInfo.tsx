// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoAppearances from "./EntityInfoAppearances";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {} from "@/redux/slices/recipesSlice";
import {
  getUserInstanceTemplate,
  selectLoadingGetUserInstanceTemplate,
} from "@/redux/slices/instanceTemplatesSlice";
import {
  getUserMealPrepPlan,
  selectLoadingGetUserMealPrepPlan,
} from "@/redux/slices/mealPrepPlansSlice";

const MealPrepPlanInfo: FC<{ entityId: string; userId: string }> = ({
  entityId,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const loadingGetUserMealPrepPlan = useAppSelector(
    selectLoadingGetUserMealPrepPlan
  );

  useEffect(() => {
    console.log(loadingGetUserMealPrepPlan, userId, entityId);
    if (loadingGetUserMealPrepPlan === "IDLE" && userId && entityId) {
      dispatch(getUserMealPrepPlan({ userId, mealPrepPlanId: entityId }));
    }
  }, [entityId, userId, loadingGetUserMealPrepPlan]);

  return (
    <div className={entityInfoStyles.entityInfoContainer}>
      <PageTitle
        titleContent="View Meal Prep Plan"
        subtitleContent="your plan of the week"
      />
      <div className={entityInfoStyles.entityInfoContent}>
        <EntityInfoDetails entityId={entityId} entityType="mealPrepPlan" />
      </div>
    </div>
  );
};

export default MealPrepPlanInfo;
