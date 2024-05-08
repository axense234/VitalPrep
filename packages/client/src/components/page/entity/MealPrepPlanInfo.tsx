// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoComponents from "./EntityInfoComponents";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getUserMealPrepPlan,
  selectLoadingGetUserMealPrepPlan,
} from "@/redux/slices/mealPrepPlansSlice";
// Helpers
import getPageTitlePropsBasedOnPathname from "@/helpers/getPageTitlePropsBasedOnPathname";

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

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    getPageTitlePropsBasedOnPathname("/mealPrepPlan");

  return (
    <div className={entityInfoStyles.entityInfoContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
      <div className={entityInfoStyles.entityInfoContent}>
        <EntityInfoDetails entityId={entityId} entityType="mealPrepPlan" />
        <EntityInfoComponents entityId={entityId} entityType="mealPrepPlan" />
      </div>
    </div>
  );
};

export default MealPrepPlanInfo;
