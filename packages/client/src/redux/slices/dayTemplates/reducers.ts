// Types
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import DayTemplateTemplate from "@/core/types/entity/dayTemplate/DayTemplateTemplate";
import DayTemplatesSliceStateType from "@/core/types/entity/dayTemplate/DayTemplatesSliceStateType";
// Redux
import { PayloadAction } from "@reduxjs/toolkit";

const dayTemplatesSliceReducers = {
  updateLoadingGetUserDayTemplates(
    state: DayTemplatesSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingGetUserDayTemplates = action.payload;
  },
  updateLoadingUpdateDayTemplate(
    state: DayTemplatesSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingUpdateDayTemplate = action.payload;
  },
  updateNumberOfMeals(
    state: DayTemplatesSliceStateType,
    action: PayloadAction<number>
  ) {
    state.numberOfMeals = action.payload as number;
  },
  updateLoadingCreateDayTemplate(
    state: DayTemplatesSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingCreateDayTemplate = action.payload;
  },
  updateTemplateDayTemplate(
    state: DayTemplatesSliceStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    state.templateDayTemplate = {
      ...state.templateDayTemplate,
      [action.payload.key]: action.payload.value,
    };
  },
  setTemplateDayTemplate(
    state: DayTemplatesSliceStateType,
    action: PayloadAction<DayTemplateTemplate>
  ) {
    state.templateDayTemplate = action.payload;
  },
};

export default dayTemplatesSliceReducers;
