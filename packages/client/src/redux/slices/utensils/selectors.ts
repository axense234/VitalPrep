// State Type
import { State } from "@/redux/api/store";
// Adapter
import utensilsAdapter from "./adapter";

export const {
  selectAll: selectAllUtensils,
  selectById: selectUtensilById,
  selectIds: selectAllUtensilsIds,
} = utensilsAdapter.getSelectors<State>((state) => state.utensils);

export const selectTemplateUtensil = (state: State) =>
  state.utensils.templateUtensil;

export const selectLoadingCreateUtensil = (state: State) =>
  state.utensils.loadingCreateUtensil;

export const selectUtensilFormModalErrorMessage = (state: State) =>
  state.utensils.utensilFormModalErrorMessage;

export const selectLoadingGetUserUtensils = (state: State) =>
  state.utensils.loadingGetUserUtensils;

export const selectLoadingGetUserUtensil = (state: State) =>
  state.utensils.loadingGetUserUtensil;

export const selectLoadingUpdateUtensil = (state: State) =>
  state.utensils.loadingUpdateUtensil;

export const selectLoadingDeleteUtensil = (state: State) =>
  state.utensils.loadingDeleteUtensil;
