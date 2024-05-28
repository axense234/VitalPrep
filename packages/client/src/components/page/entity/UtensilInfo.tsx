// SCSS
import entityInfoStyles from "@/scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityMutationMenu from "@/components/shared/entity/EntityMutationMenu";
import EntityInfoAppearances from "./EntityInfoAppearances";
import UpsertUtensilInterface from "../create-tool/interfaces/UpsertUtensilInterface";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUserUtensil } from "@/redux/slices/utensils/thunks";
import { selectLoadingGetUserUtensil } from "@/redux/slices/utensils/selectors";
// Types
import EntityInfoProps from "@/core/interfaces/entity/EntityInfoProps";
// Hooks
import useGetHandleOnDeleteEntity from "@/hooks/useGetHandleOnDeleteEntity";
import useNavigateToPathname from "@/hooks/useNavigateToPathname";
// Translations
import { useTranslations } from "next-intl";
// Next
import { useSearchParams } from "next/navigation";

const UtensilInfo: FC<EntityInfoProps> = ({
  entityId,
  userId,
  hasEntityMutationMenu = true,
}) => {
  const searchParams = useSearchParams();
  const editMode = searchParams.get("edit");
  console.log(editMode);

  const dispatch = useAppDispatch();
  const loadingGetUserUtensil = useAppSelector(selectLoadingGetUserUtensil);

  const navigateToPathname = useNavigateToPathname();
  const handleOnDeleteEntity = useGetHandleOnDeleteEntity(
    "utensil",
    entityId,
    userId
  );

  const translate = useTranslations("warningOverlay.pageInfo");

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
          handleEntityModification={() =>
            navigateToPathname({ forcedQueryParams: { edit: "true" } })
          }
          handleEntityViewing={() =>
            navigateToPathname({ forcedQueryParams: {} })
          }
          entityType="utensil"
          entityName={translate("utensil")}
        />
      )}
      <div className={entityInfoStyles.entityInfoContent}>
        {editMode === "true" ? (
          <UpsertUtensilInterface interfaceType="update" />
        ) : (
          <>
            <EntityInfoDetails entityId={entityId} entityType="utensil" />
            <EntityInfoAppearances entityId={entityId} entityType="utensil" />
          </>
        )}
      </div>
    </div>
  );
};

export default UtensilInfo;
