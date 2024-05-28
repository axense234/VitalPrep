// State Type
import { State } from "@/redux/api/store";
// Adapter
import instanceTemplatesAdapter from "./adapter";

export const {
  selectAll: selectAllInstanceTemplates,
  selectById: selectInstanceTemplateById,
  selectIds: selectAllInstanceTemplatesIds,
} = instanceTemplatesAdapter.getSelectors<State>(
  (state) => state.instanceTemplates
);

export const selectTemplateInstanceTemplate = (state: State) =>
  state.instanceTemplates.templateInstanceTemplate;

export const selectLoadingCreateInstanceTemplate = (state: State) =>
  state.instanceTemplates.loadingCreateInstanceTemplate;

export const selectInstanceTemplateFormModalErrorMessage = (state: State) =>
  state.instanceTemplates.instanceTemplateFormModalErrorMessage;

export const selectLoadingGetUserInstanceTemplates = (state: State) =>
  state.instanceTemplates.loadingGetUserInstanceTemplates;

export const selectLoadingGetUserInstanceTemplate = (state: State) =>
  state.instanceTemplates.loadingGetUserInstanceTemplate;

export const selectLoadingUpdateInstanceTemplate = (state: State) =>
  state.instanceTemplates.loadingUpdateInstanceTemplate;

export const selectLoadingDeleteInstanceTemplate = (state: State) =>
  state.instanceTemplates.loadingDeleteInstanceTemplate;
