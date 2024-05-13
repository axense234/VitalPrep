// React
import { useEffect } from "react";
// Types
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import EntityTemplateWithMacrosType from "@/core/types/entity/EntityTemplateWithMacrosType";
// Redux
import { useAppDispatch } from "./redux";
import { UnknownAction } from "@reduxjs/toolkit";

const useUpdateEntityMacrosBasedOnComponent = (
  entityComponent: EntityTemplateWithMacrosType,
  updateTemplateEntityReducer: (payload: ObjectKeyValueType) => UnknownAction
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (entityComponent) {
      dispatch(
        updateTemplateEntityReducer({
          key: "macros",
          value: entityComponent?.macros,
        })
      );
    }
  }, [entityComponent]);
};

export default useUpdateEntityMacrosBasedOnComponent;
