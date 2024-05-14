// Data
import { defaultEntityQueryValues } from "@/data";
// React
import { useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "./redux";
import { selectProfile } from "@/redux/slices/generalSlice";
import { UnknownAction } from "@reduxjs/toolkit";
// Types
import LoadingStateType from "@/core/types/LoadingStateType";
import GetAllUserEntitiesAsyncThunkType from "@/core/types/GetAllUserEntitiesAsyncThunkType";
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
// Helpers
import getLoadingProfile from "@/helpers/getLoadingProfile";

const useGetEntityComponents = (
  loadingGetUserEntities: LoadingStateType,
  getAllUserEntities: GetAllUserEntitiesAsyncThunkType,
  getAllUserEntitiesCallCondition: boolean = true,
  entityQueryValues?: EntityQueryValues,
  resetLoadingGetUserEntities?: boolean,
  updateLoadingGetUserEntitiesReducer?: (
    payload: LoadingStateType
  ) => UnknownAction
) => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectProfile);

  const loadingProfile = getLoadingProfile();

  useEffect(() => {
    if (
      loadingGetUserEntities === "IDLE" &&
      loadingProfile &&
      profile.id &&
      getAllUserEntitiesCallCondition
    ) {
      dispatch(
        getAllUserEntities({
          userId: profile.id,
          entityQueryValues: entityQueryValues || defaultEntityQueryValues,
        }) as unknown as UnknownAction
      );
    }
  }, [
    loadingGetUserEntities,
    loadingProfile,
    profile.id,
    entityQueryValues,
    getAllUserEntitiesCallCondition,
  ]);

  useEffect(() => {
    if (resetLoadingGetUserEntities && updateLoadingGetUserEntitiesReducer) {
      if (
        loadingGetUserEntities === "FAILED" ||
        loadingGetUserEntities === "SUCCEDED"
      ) {
        dispatch(updateLoadingGetUserEntitiesReducer("IDLE"));
      }
    }
  }, [entityQueryValues]);
};

export default useGetEntityComponents;
