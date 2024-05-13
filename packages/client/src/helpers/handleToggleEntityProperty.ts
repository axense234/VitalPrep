// Types
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
// Redux
import { State } from "@/redux/api/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const handleToggleEntityProperty = (
  toggleCondition: boolean,
  updateTemplateEntity: (payload: ObjectKeyValueType) => UnknownAction,
  entityPropertyKey: string,
  entityPropertyValue: any,
  dispatch: ThunkDispatch<State, {}, UnknownAction>
) => {
  if (toggleCondition) {
    dispatch(
      updateTemplateEntity({
        key: entityPropertyKey,
        value: entityPropertyValue,
      })
    );
  } else {
    dispatch(
      updateTemplateEntity({
        key: entityPropertyKey,
        value: entityPropertyValue,
      })
    );
  }
};

export default handleToggleEntityProperty;
