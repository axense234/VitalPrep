// Types
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
import InstanceTemplatesSliceStateType from "@/core/types/entity/instanceTemplate/InstanceTemplatesSliceStateType";
// Redux
import { PayloadAction } from "@reduxjs/toolkit";

const instanceTemplatesSliceReducers = {
  setTemplateInstanceTemplate(
    state: InstanceTemplatesSliceStateType,
    action: PayloadAction<InstanceTemplateTemplate>
  ) {
    state.templateInstanceTemplate = action.payload;
  },
  updateLoadingGetUserInstanceTemplates(
    state: InstanceTemplatesSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingGetUserInstanceTemplates = action.payload;
  },
  updateLoadingGetUserInstanceTemplate(
    state: InstanceTemplatesSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingGetUserInstanceTemplate = action.payload;
  },
  updateLoadingCreateInstanceTemplate(
    state: InstanceTemplatesSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingCreateInstanceTemplate = action.payload;
  },
  updateLoadingUpdateInstanceTemplate(
    state: InstanceTemplatesSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingUpdateInstanceTemplate = action.payload;
  },
  updateTemplateInstanceTemplate(
    state: InstanceTemplatesSliceStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    state.templateInstanceTemplate = {
      ...state.templateInstanceTemplate,
      [action.payload.key]: action.payload.value,
    };
  },
};

export default instanceTemplatesSliceReducers;
