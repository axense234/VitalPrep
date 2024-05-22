// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityMutationMenu from "@/components/shared/entity/EntityMutationMenu";
import EntityInfoAppearances from "./EntityInfoAppearances";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getUserUtensil,
  selectLoadingGetUserUtensil,
} from "@/redux/slices/utensilsSlice";
// Types
import EntityInfoProps from "@/core/interfaces/entity/EntityInfoProps";
// Hooks
import useGetHandleOnDeleteEntity from "@/hooks/useGetHandleOnDeleteEntity";
import useNavigateToPathname from "@/hooks/useNavigateToPathname";

const UtensilInfo: FC<EntityInfoProps> = ({
  entityId,
  userId,
  hasEntityMutationMenu = true,
}) => {
  const dispatch = useAppDispatch();
  const loadingGetUserUtensil = useAppSelector(selectLoadingGetUserUtensil);

  const navigateToPathname = useNavigateToPathname();
  const handleOnDeleteEntity = useGetHandleOnDeleteEntity(
    "utensil",
    entityId,
    userId
  );
  useEffect(() => {
    if (loadingGetUserUtensil === "IDLE" && userId && entityId) {
      dispatch(getUserUtensil({ userId, utensilId: entityId }));
    }
  }, [entityId, userId, loadingGetUserUtensil]);

  return (
    <div className={entityInfoStyles.entityInfoContainer}>
      <PageTitle />
      {hasEntityMutationMenu && (
        <EntityMutationMenu
          type="entityInfo"
          handleEntityDeletion={handleOnDeleteEntity}
          handleEntityModification={() => navigateToPathname({})}
        />
      )}
      <div className={entityInfoStyles.entityInfoContent}>
        <EntityInfoDetails entityId={entityId} entityType="utensil" />
        <EntityInfoAppearances entityId={entityId} entityType="utensil" />
      </div>
    </div>
  );
};

export default UtensilInfo;
