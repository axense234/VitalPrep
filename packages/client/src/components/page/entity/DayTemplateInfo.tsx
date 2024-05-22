// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoAppearances from "./EntityInfoAppearances";
import EntityInfoComponents from "./EntityInfoComponents";
import EntityMutationMenu from "@/components/shared/entity/EntityMutationMenu";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {} from "@/redux/slices/recipesSlice";
import {
  getUserDayTemplate,
  selectLoadingGetUserDayTemplate,
} from "@/redux/slices/dayTemplatesSlice";
// Types
import EntityInfoProps from "@/core/interfaces/entity/EntityInfoProps";
// Hooks
import useGetHandleOnDeleteEntity from "@/hooks/useGetHandleOnDeleteEntity";
import useNavigateToPathname from "@/hooks/useNavigateToPathname";

const DayTemplateInfo: FC<EntityInfoProps> = ({
  entityId,
  userId,
  hasEntityMutationMenu = true,
}) => {
  const dispatch = useAppDispatch();
  const loadingGetUserDayTemplate = useAppSelector(
    selectLoadingGetUserDayTemplate
  );

  const navigateToPathname = useNavigateToPathname();
  const handleOnDeleteEntity = useGetHandleOnDeleteEntity(
    "dayTemplate",
    entityId,
    userId
  );

  useEffect(() => {
    console.log(loadingGetUserDayTemplate, userId, entityId);
    if (loadingGetUserDayTemplate === "IDLE" && userId && entityId) {
      dispatch(getUserDayTemplate({ userId, dayTemplateId: entityId }));
    }
  }, [entityId, userId, loadingGetUserDayTemplate]);

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
        <EntityInfoDetails entityId={entityId} entityType="dayTemplate" />
        <EntityInfoComponents entityId={entityId} entityType="dayTemplate" />
        <EntityInfoAppearances entityId={entityId} entityType="dayTemplate" />
      </div>
    </div>
  );
};

export default DayTemplateInfo;
