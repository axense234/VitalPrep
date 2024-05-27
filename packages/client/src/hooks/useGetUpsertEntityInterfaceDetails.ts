import LoadingStateType from "@/core/types/LoadingStateType";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const useGetUpsertEntityInterfaceDetails = ({
  interfaceType,
  loadingCreateEntity,
  loadingUpdateEntity,
  translate,
  updateLoadingCreateEntity,
  updateLoadingUpdateEntity,
}: {
  interfaceType: "create" | "update";
  loadingCreateEntity: LoadingStateType;
  loadingUpdateEntity: LoadingStateType;
  translate: any;
  updateLoadingCreateEntity: ActionCreatorWithPayload<LoadingStateType>;
  updateLoadingUpdateEntity: ActionCreatorWithPayload<LoadingStateType>;
}) => {
  const loadingUpsertEntity =
    interfaceType === "create" ? loadingCreateEntity : loadingUpdateEntity;

  const updateLoadingUpsertEntity =
    interfaceType === "create"
      ? updateLoadingCreateEntity
      : updateLoadingUpdateEntity;

  const usedSectionTitle =
    interfaceType === "create"
      ? translate("createSectionTitle")
      : translate("updateSectionTitle");

  const usedButtonLabel =
    interfaceType === "create"
      ? translate("createButtonLabel")
      : translate("updateButtonLabel");

  return {
    loadingUpsertEntity,
    updateLoadingUpsertEntity,
    usedSectionTitle,
    usedButtonLabel,
  };
};

export default useGetUpsertEntityInterfaceDetails;
