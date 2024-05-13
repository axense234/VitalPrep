// Types
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
// Redux
import EntitiesType from "@/core/types/entity/EntitiesType";
import { State } from "@/redux/api/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const handleUpdateMultipleArrayEntities = (
  entityIds: string[] = [],
  entityId: string,
  entityType: EntitiesType,
  updateTemplateEntityReducer: (payload: ObjectKeyValueType) => UnknownAction,
  dispatch: ThunkDispatch<State, {}, UnknownAction>
) => {
  if (entityIds?.find((id) => id === entityId)) {
    dispatch(
      updateTemplateEntityReducer({
        key: entityType,
        value: entityIds.filter((id) => id !== entityId),
      })
    );
  } else {
    dispatch(
      updateTemplateEntityReducer({
        key: entityType,
        value: [...entityIds, entityId],
      })
    );
  }
};

export default handleUpdateMultipleArrayEntities;
