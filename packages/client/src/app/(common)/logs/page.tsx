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
import ViewEntityOptions from "@/components/page/entity/ViewEntityOptions";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectEntityQueryValues,
  selectLoadingGetOAuthProfile,
  selectLoadingGetProfile,
  selectProfile,
} from "@/redux/slices/generalSlice";
import {
  getAllUserMealPrepLogs,
  selectAllMealPrepLogsIds,
  selectLoadingGetUserMealPrepLogs,
  updateLoadingGetUserMealPrepLogs,
} from "@/redux/slices/mealPrepLogsSlice";
// Data
import { pageTitleContent } from "@/data";

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
    if (loadingGetUserMealPrepLogs === "IDLE" && profile.id) {
      dispatch(
        getAllUserMealPrepLogs({
          entityQueryValues: mealPrepLogsQueryValues,
          userId: profile.id,
        })
      );
    }
  }, [loadingGetUserMealPrepLogs, profile.id]);

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    pageTitleContent.find(
      (pageTitle) => pageTitle.specificPagePath === "/logs"
    ) || pageTitleContent[0];

  return (
    <div className={multiViewToolStyles.multiViewToolContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
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
