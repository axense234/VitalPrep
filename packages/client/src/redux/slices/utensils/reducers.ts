// Types
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import UtensilTemplate from "@/core/types/entity/utensil/UtensilTemplate";
import UtensilsSliceStateType from "@/core/types/entity/utensil/UtensilsSliceStateType";
// Redux
import { PayloadAction } from "@reduxjs/toolkit";

const utensilsSliceReducers = {
  updateLoadingCreateUtensil(
    state: UtensilsSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingCreateUtensil = action.payload;
  },
  updateLoadingUpdateUtensil(
    state: UtensilsSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingUpdateUtensil = action.payload;
  },
  updateLoadingGetUserUtensils(
    state: UtensilsSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingGetUserUtensils = action.payload;
  },
  updateTemplateUtensil(
    state: UtensilsSliceStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    state.templateUtensil = {
      ...state.templateUtensil,
      [action.payload.key]: action.payload.value,
    };
  },
  setTemplateUtensil(
    state: UtensilsSliceStateType,
    action: PayloadAction<UtensilTemplate>
  ) {
    state.templateUtensil = action.payload;
  },
};

export default utensilsSliceReducers;
