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
  key: "imageUrl";
  value: string;
}) => UnknownAction;

const useUpdateEntityTemplateImageUrl = (
  updateTemplateEntityReducer: updateTemplateEntityReducerType
) => {
  const dispatch = useAppDispatch();
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateEntityReducer({
          key: "imageUrl",
          value: templateImageUrl,
        })
      );
    }
  }, [loadingCloudinaryImage]);
};

export default useUpdateEntityTemplateImageUrl;
