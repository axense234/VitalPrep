"use client";
// SCSS
import multiViewToolStyles from "@/scss/pages/MultiViewTool.module.scss";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Components
import PageTitle from "@/components/shared/PageTitle";
import MultiViewToolContent from "@/components/page/multi-view-tool/MultiViewToolContent";
import ViewEntityOptions from "@/components/page/multi-view-tool/ViewEntityOptions";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectEntityQueryValues } from "@/redux/slices/general/selectors";
import {
  selectLoadingGetUserMealPrepLogs,
  selectAllMealPrepLogsIds,
} from "@/redux/slices/mealPrepLogs/selectors";
import { updateLoadingGetUserMealPrepLogs } from "@/redux/slices/mealPrepLogs/slice";
import { getAllUserMealPrepLogs } from "@/redux/slices/mealPrepLogs/thunks";
// Hooks
import useGetEntityComponents from "@/hooks/useGetEntityComponents";

const MealPrepLogs = () => {
  useAuthorization();

  const loadingGetUserMealPrepLogs = useAppSelector(
    selectLoadingGetUserMealPrepLogs
  );
  const mealPrepLogsQueryValues = useAppSelector(selectEntityQueryValues);
  const mealPrepLogsIds = useAppSelector(selectAllMealPrepLogsIds);

  useGetEntityComponents(
    loadingGetUserMealPrepLogs,
    getAllUserMealPrepLogs,
    true,
    mealPrepLogsQueryValues,
    true,
    updateLoadingGetUserMealPrepLogs
  );

  return (
    <div className={multiViewToolStyles.multiViewToolContainer}>
      <PageTitle />
      <div className={multiViewToolStyles.multiViewToolContent}>
        <ViewEntityOptions viewMealPrepLog={true} />
        <MultiViewToolContent
          entityType="mealPrepLog"
          entityIds={mealPrepLogsIds}
        />
      </div>
    </div>
  );
};

export default MealPrepLogs;
