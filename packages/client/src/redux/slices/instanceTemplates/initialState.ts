// Types
import InstanceTemplatesSliceStateType from "@/core/types/entity/instanceTemplate/InstanceTemplatesSliceStateType";
// Data
import { defaultTemplateInstanceTemplate } from "@/data";
// Adapter
import instanceTemplatesAdapter from "./adapter";

const instanceTemplatesSliceInitialState =
  instanceTemplatesAdapter.getInitialState({
    templateInstanceTemplate: defaultTemplateInstanceTemplate,
    loadingCreateInstanceTemplate: "IDLE",
    loadingDeleteInstanceTemplate: "IDLE",
    loadingUpdateInstanceTemplate: "IDLE",
    instanceTemplateFormModalErrorMessage:
      "Something went wrong, please refresh the page!",
    loadingGetUserInstanceTemplates: "IDLE",
    loadingGetUserInstanceTemplate: "IDLE",
  }) as InstanceTemplatesSliceStateType;

export default instanceTemplatesSliceInitialState;
