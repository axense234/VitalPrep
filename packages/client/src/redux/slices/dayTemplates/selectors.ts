// State Type
import { State } from "@/redux/api/store";
// Adapter
import dayTemplatesAdapter from "./adapter";

export const {
  selectAll: selectAllDayTemplates,
  selectById: selectDayTemplateById,
  selectIds: selectAllDayTemplatesIds,
} = dayTemplatesAdapter.getSelectors<State>((state) => state.dayTemplates);

export const selectTemplateDayTemplate = (state: State) =>
  state.dayTemplates.templateDayTemplate;

export const selectLoadingCreateDayTemplate = (state: State) =>
  state.dayTemplates.loadingCreateDayTemplate;

export const selectDayTemplateFormModalErrorMessage = (state: State) =>
  state.dayTemplates.dayTemplateFormModalErrorMessage;

export const selectNumberOfMeals = (state: State) =>
  state.dayTemplates.numberOfMeals;

export const selectLoadingGetUserDayTemplates = (state: State) =>
  state.dayTemplates.loadingGetUserDayTemplates;

export const selectLoadingGetUserDayTemplate = (state: State) =>
  state.dayTemplates.loadingGetUserDayTemplate;

export const selectLoadingUpdateDayTemplate = (state: State) =>
  state.dayTemplates.loadingUpdateDayTemplate;

export const selectLoadingDeleteDayTemplate = (state: State) =>
  state.dayTemplates.loadingDeleteDayTemplate;
