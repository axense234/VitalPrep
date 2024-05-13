import { EntityState } from "@reduxjs/toolkit/react";
import InstanceTemplatesSliceInitialStateType from "./InstanceTemplatesSliceInitialStateType";
import InstanceTemplateType from "./InstanceTemplateType";

type InstanceTemplatesSliceStateType = EntityState<
  InstanceTemplateType,
  string
> &
  InstanceTemplatesSliceInitialStateType;

export default InstanceTemplatesSliceStateType;
