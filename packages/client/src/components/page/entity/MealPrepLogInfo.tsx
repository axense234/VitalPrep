// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getUserMealPrepLog,
  selectLoadingGetUserMealPrepLog,
} from "@/redux/slices/mealPrepLogsSlice";

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

  return (
    <div className={entityInfoStyles.entityInfoContainer}>
      <PageTitle
        titleContent="View Meal Prep Log"
        subtitleContent="the details of your log"
      />
      <div className={entityInfoStyles.entityInfoContent}>
        <EntityInfoDetails entityId={entityId} entityType="mealPrepLog" />
      </div>
    </div>
  );
};

export default MealPrepLogInfo;
