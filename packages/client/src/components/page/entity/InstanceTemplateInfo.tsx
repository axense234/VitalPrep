// SCSS
import entityInfoStyles from "@/scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoAppearances from "./EntityInfoAppearances";
import EntityInfoComponents from "./EntityInfoComponents";
import EntityMutationMenu from "@/components/shared/entity/EntityMutationMenu";
import UpsertInstanceTemplateInterface from "../create-tool/interfaces/UpsertInstanceTemplateInterface";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getUserInstanceTemplate,
  selectLoadingGetUserInstanceTemplate,
} from "@/redux/slices/instanceTemplatesSlice";
// Types
import EntityInfoProps from "@/core/interfaces/entity/EntityInfoProps";
// Hooks
import useGetHandleOnDeleteEntity from "@/hooks/useGetHandleOnDeleteEntity";
import useNavigateToPathname from "@/hooks/useNavigateToPathname";
// Translations
import { useTranslations } from "next-intl";
// Next
import { useSearchParams } from "next/navigation";

const InstanceTemplateInfo: FC<EntityInfoProps> = ({
  entityId,
  userId,
  hasEntityMutationMenu = true,
}) => {
  const searchParams = useSearchParams();
  const editMode = searchParams.get("edit");
  console.log(editMode);

  const dispatch = useAppDispatch();
  const loadingGetUserInstanceTemplate = useAppSelector(
    selectLoadingGetUserInstanceTemplate
  );

  const navigateToPathname = useNavigateToPathname();
  const handleOnDeleteEntity = useGetHandleOnDeleteEntity(
    "instanceTemplate",
    entityId,
    userId
  );

  const translate = useTranslations("warningOverlay.pageInfo");

  useEffect(() => {
    console.log(loadingGetUserInstanceTemplate, userId, entityId);
    if (loadingGetUserInstanceTemplate === "IDLE" && userId && entityId) {
      dispatch(
        getUserInstanceTemplate({ userId, instanceTemplateId: entityId })
      );
    }
  }, [entityId, userId, loadingGetUserInstanceTemplate]);

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
          entityType="instanceTemplate"
          entityName={translate("instanceTemplate")}
        />
      )}
      <div className={entityInfoStyles.entityInfoContent}>
        {editMode === "true" ? (
          <UpsertInstanceTemplateInterface interfaceType="update" />
        ) : (
          <>
            <EntityInfoDetails
              entityId={entityId}
              entityType="instanceTemplate"
            />
            <EntityInfoComponents
              entityId={entityId}
              entityType="instanceTemplate"
            />
            <EntityInfoAppearances
              entityId={entityId}
              entityType="instanceTemplate"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InstanceTemplateInfo;
