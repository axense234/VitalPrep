// React
import { useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "./redux";
import {
  selectLoadingCloudinaryImage,
  selectTemplateImageUrl,
} from "@/redux/slices/generalSlice";
import { UnknownAction } from "@reduxjs/toolkit";

type updateTemplateEntityReducerType = (payload: {
  key: string;
  value: string;
}) => UnknownAction;

const useUpdateEntityTemplateImageUrl = (
  updateTemplateEntityReducer: updateTemplateEntityReducerType,
  entityPropertyKeyToUpdate?: string,
  entityPropertyValueToUpdate?: string
) => {
  const dispatch = useAppDispatch();
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateEntityReducer({
          key: entityPropertyKeyToUpdate || "imageUrl",
          value: entityPropertyValueToUpdate || templateImageUrl,
        })
      );
    }
  }, [loadingCloudinaryImage, templateImageUrl]);
};

export default useUpdateEntityTemplateImageUrl;
