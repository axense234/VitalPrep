import { EntityState } from "@reduxjs/toolkit";
import DayTemplatesSliceInitialStateType from "./DayTemplatesSliceInitialStateType";
import DayTemplateType from "./DayTemplateType";

type DayTemplatesSliceStateType = EntityState<DayTemplateType, string> &
  DayTemplatesSliceInitialStateType;
export default DayTemplatesSliceStateType;
