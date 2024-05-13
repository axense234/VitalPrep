// React
import { useEffect } from "react";
// Types
import EntitiesType from "@/core/types/entity/EntitiesType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
// Redux
import { useAppDispatch } from "./redux";
import { UnknownAction } from "@reduxjs/toolkit";

const useSliceEntityComponents = (
  sliceTopDelimiter: number,
  componentEntityType: EntitiesType,
  updateTemplateEntityReducer: (payload: ObjectKeyValueType) => UnknownAction,
  entityComponentsToBeSliced: string[]
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (sliceTopDelimiter && sliceTopDelimiter >= 1) {
      dispatch(
        updateTemplateEntityReducer({
          key: componentEntityType,
          value: entityComponentsToBeSliced.slice(0, sliceTopDelimiter),
        })
      );
    }
  }, [sliceTopDelimiter]);
};

export default useSliceEntityComponents;
