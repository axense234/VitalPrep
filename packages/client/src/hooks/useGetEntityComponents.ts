// Data
import { defaultEntityQueryValues } from "@/data";
// React
import { useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "./redux";
import {
  selectLoadingGetProfile,
  selectLoadingGetOAuthProfile,
  selectProfile,
} from "@/redux/slices/generalSlice";
import { UnknownAction } from "@reduxjs/toolkit";
// Types
import LoadingStateType from "@/core/types/LoadingStateType";
import GetAllUserEntitiesAsyncThunkType from "@/core/types/GetAllUserEntitiesAsyncThunkType";

const useGetEntityComponents = (
  loadingGetUserEntities: LoadingStateType,
  getAllUserEntities: GetAllUserEntitiesAsyncThunkType
) => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectProfile);

  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);
  const loadingProfile =
    loadingGetProfile === "SUCCEDED"
      ? loadingGetProfile
      : loadingGetOAuthProfile;

  useEffect(() => {
    if (loadingGetUserEntities === "IDLE" && loadingProfile) {
      dispatch(
        getAllUserEntities({
          userId: profile.id,
          entityQueryValues: defaultEntityQueryValues,
        }) as unknown as UnknownAction
      );
    }
  }, [loadingGetUserEntities, loadingProfile]);
};

export default useGetEntityComponents;
