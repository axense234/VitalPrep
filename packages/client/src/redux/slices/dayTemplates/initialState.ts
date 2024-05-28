// Types
import DayTemplatesSliceStateType from "@/core/types/entity/dayTemplate/DayTemplatesSliceStateType";
// Data
import { defaultTemplateDayTemplate } from "@/data";
// Adapter
import dayTemplatesAdapter from "./adapter";

const dayTemplatesSliceInitialState = dayTemplatesAdapter.getInitialState({
  templateDayTemplate: defaultTemplateDayTemplate,
  loadingCreateDayTemplate: "IDLE",
  loadingDeleteDayTemplate: "IDLE",
  loadingUpdateDayTemplate: "IDLE",
  dayTemplateFormModalErrorMessage:
    "Something went wrong, please refresh the page!",
  numberOfMeals: 0,
  mealsInOrder: [],
  loadingGetUserDayTemplates: "IDLE",
  loadingGetUserDayTemplate: "IDLE",
}) as DayTemplatesSliceStateType;

export default dayTemplatesSliceInitialState;
