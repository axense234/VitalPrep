// Types
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import EntitiesType from "@/core/types/entity/EntitiesType";
// Redux
import { State } from "@/redux/api/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const handleUpdateArrayEntities = (
  sourceEntityIds: string[] = [],
  currentEntityIds: string[] = [],
  entityId: string,
  entityIndex: number,
  entityType: EntitiesType,
  updateTemplateEntityReducer: (payload: ObjectKeyValueType) => UnknownAction,
  dispatch: ThunkDispatch<State, {}, UnknownAction>
) => {
  if (
    sourceEntityIds?.find((id) => id === entityId) &&
    currentEntityIds[entityIndex] === entityId
  ) {
    const newEntityIds = [...currentEntityIds];
    newEntityIds[entityIndex] = "";
    dispatch(
      updateTemplateEntityReducer({
        key: entityType,
        value: newEntityIds,
      })
    );
  } else {
    const newEntityIds = [...currentEntityIds];
    newEntityIds[entityIndex] = entityId;
    dispatch(
      updateTemplateEntityReducer({
        key: entityType,
        value: newEntityIds,
      })
    );
  }
};

export default handleUpdateArrayEntities;
