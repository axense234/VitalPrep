import { EntityState } from "@reduxjs/toolkit";
import UtensilsSliceInitialStateType from "./UtensilsSliceInitialStateType";
import UtensilType from "./UtensilType";

type UtensilsSliceStateType = EntityState<UtensilType, string> &
  UtensilsSliceInitialStateType;
export default UtensilsSliceStateType;
