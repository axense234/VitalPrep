// Types
import UtensilsSliceStateType from "@/core/types/entity/utensil/UtensilsSliceStateType";
// Data
import { defaultTemplateUtensil } from "@/data";
// Adapter
import utensilsAdapter from "./adapter";

const utensilsSliceInitialState = utensilsAdapter.getInitialState({
  templateUtensil: defaultTemplateUtensil,
  loadingCreateUtensil: "IDLE",
  loadingDeleteUtensil: "IDLE",
  loadingUpdateUtensil: "IDLE",
  utensilFormModalErrorMessage:
    "Something went wrong, please refresh the page!",
  loadingGetUserUtensils: "IDLE",
  loadingGetUserUtensil: "IDLE",
}) as UtensilsSliceStateType;

export default utensilsSliceInitialState;
