import LoadingStateType from "../../LoadingStateType";
import DayTemplateTemplate from "./DayTemplateTemplate";

type DayTemplatesSliceInitialStateType = {
  // General
  templateDayTemplate: DayTemplateTemplate;
  loadingCreateDayTemplate: LoadingStateType;
  loadingDeleteDayTemplate: LoadingStateType;
  loadingUpdateDayTemplate: LoadingStateType;
  dayTemplateFormModalErrorMessage: string;
  numberOfMeals: number;

  loadingGetUserDayTemplates: LoadingStateType;
  loadingGetUserDayTemplate: LoadingStateType;
};

export default DayTemplatesSliceInitialStateType;
