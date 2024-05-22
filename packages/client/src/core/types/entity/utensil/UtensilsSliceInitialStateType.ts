import LoadingStateType from "../../LoadingStateType";
import UtensilTemplate from "./UtensilTemplate";

type UtensilsSliceInitialStateType = {
  // General
  templateUtensil: UtensilTemplate;
  loadingCreateUtensil: LoadingStateType;
  loadingDeleteUtensil: LoadingStateType;
  utensilFormModalErrorMessage: string;

  loadingGetUserUtensils: LoadingStateType;
  loadingGetUserUtensil: LoadingStateType;
};

export default UtensilsSliceInitialStateType;
