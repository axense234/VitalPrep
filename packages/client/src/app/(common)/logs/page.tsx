"use client";
// React
import { useEffect } from "react";
// SCSS
import multiViewToolStyles from "../../../scss/pages/MultiViewTool.module.scss";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Components
import PageTitle from "@/components/shared/PageTitle";
import MultiViewToolContent from "@/components/page/multi-view-tool/MultiViewToolContent";
import MealPrepLogsOptions from "@/components/page/logs/MealPrepLogsOptions";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectEntityQueryValues,
  selectLoadingGetOAuthProfile,
  selectLoadingGetProfile,
  selectProfile,
  setSelectedEntityOption,
} from "@/redux/slices/generalSlice";
import {
  getAllUserMealPrepLogs,
  selectAllMealPrepLogsIds,
  selectLoadingGetUserMealPrepLogs,
  updateLoadingGetUserMealPrepLogs,
} from "@/redux/slices/mealPrepLogsSlice";

const MealPrepLogs = () => {
  useAuthorization();

  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const loadingGetUserMealPrepLogs = useAppSelector(
    selectLoadingGetUserMealPrepLogs
  );

  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);
  const loadingProfile =
    loadingGetProfile === "SUCCEDED"
      ? loadingGetProfile
      : loadingGetOAuthProfile;

  const mealPrepLogsQueryValues = useAppSelector(selectEntityQueryValues);

  const mealPrepLogsIds = useAppSelector(selectAllMealPrepLogsIds);

  useEffect(() => {
    if (
      loadingGetUserMealPrepLogs === "FAILED" ||
      loadingGetUserMealPrepLogs === "SUCCEDED"
    ) {
      dispatch(updateLoadingGetUserMealPrepLogs("IDLE"));
    }
  }, [mealPrepLogsQueryValues]);

  useEffect(() => {
    if (loadingGetUserMealPrepLogs === "IDLE" && loadingProfile && profile.id) {
      dispatch(
        getAllUserMealPrepLogs({
          userId: profile.id,
          entityQueryValues: mealPrepLogsQueryValues,
        })
      );
    }
  }, [loadingProfile, profile.id, loadingGetUserMealPrepLogs]);

  useEffect(() => {
    dispatch(setSelectedEntityOption("mealPrepLog"));
  }, []);

  useEffect(() => {
    if (loadingGetUserMealPrepLogs === "IDLE" && profile.id) {
      dispatch(
        getAllUserMealPrepLogs({
          entityQueryValues: mealPrepLogsQueryValues,
          userId: profile.id,
        })
      );
    }
  }, [loadingGetUserMealPrepLogs, profile.id]);

  return (
    <div className={multiViewToolStyles.multiViewToolContainer}>
      <PageTitle
        titleContent="Meal Prep Logs"
        subtitleContent="view all your logs"
      />
      <div className={multiViewToolStyles.multiViewToolContent}>
        <MealPrepLogsOptions />
        <MultiViewToolContent
          entityType={"mealPrepLog"}
          entityIds={mealPrepLogsIds}
        />
      </div>
    </div>
  );
};

export default MealPrepLogs;
