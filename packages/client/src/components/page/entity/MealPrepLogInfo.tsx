// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoComponents from "./EntityInfoComponents";
import EntityInfoInstanceTemplate from "./EntityInfoInstanceTemplate";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getUserMealPrepLog,
  selectLoadingGetUserMealPrepLog,
} from "@/redux/slices/mealPrepLogsSlice";
// Helpers
import getPageTitlePropsBasedOnPathname from "@/helpers/getPageTitlePropsBasedOnPathname";

const MealPrepLogInfo: FC<{ entityId: string; userId: string }> = ({
  entityId,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const loadingGetUserMealPrepLog = useAppSelector(
    selectLoadingGetUserMealPrepLog
  );

  useEffect(() => {
    console.log(loadingGetUserMealPrepLog, userId, entityId);
    if (loadingGetUserMealPrepLog === "IDLE" && userId && entityId) {
      dispatch(getUserMealPrepLog({ userId, mealPrepLogId: entityId }));
    }
  }, [entityId, userId, loadingGetUserMealPrepLog]);

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    getPageTitlePropsBasedOnPathname("/mealPrepLog");

  return (
    <div className={entityInfoStyles.entityInfoContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
      <div className={entityInfoStyles.entityInfoContent}>
        <EntityInfoDetails entityId={entityId} entityType="mealPrepLog" />
        <EntityInfoInstanceTemplate entityId={entityId} />
        <EntityInfoComponents entityId={entityId} entityType="mealPrepLog" />
      </div>
    </div>
  );
};

export default MealPrepLogInfo;
