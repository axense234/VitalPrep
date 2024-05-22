import LoadingStateType from "../../LoadingStateType";
import InstanceTemplateTemplate from "./InstanceTemplateTemplate";

type InstanceTemplatesSliceInitialStateType = {
  // General
  templateInstanceTemplate: InstanceTemplateTemplate;
  loadingCreateInstanceTemplate: LoadingStateType;
  loadingDeleteInstanceTemplate: LoadingStateType;
  instanceTemplateFormModalErrorMessage: string;

  loadingGetUserInstanceTemplates: LoadingStateType;
  loadingGetUserInstanceTemplate: LoadingStateType;
};
export default InstanceTemplatesSliceInitialStateType;
