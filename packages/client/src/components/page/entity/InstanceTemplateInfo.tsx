// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoAppearances from "./EntityInfoAppearances";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {} from "@/redux/slices/recipesSlice";
import {
  getUserDayTemplate,
  selectLoadingGetUserDayTemplate,
} from "@/redux/slices/dayTemplatesSlice";
import {
  getUserInstanceTemplate,
  selectLoadingGetUserInstanceTemplate,
} from "@/redux/slices/instanceTemplatesSlice";

const InstanceTemplateInfo: FC<{ entityId: string; userId: string }> = ({
  entityId,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const loadingGetUserInstanceTemplate = useAppSelector(
    selectLoadingGetUserInstanceTemplate
  );

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
      <PageTitle
        titleContent="View Instance Template"
        subtitleContent="your meal prep template"
      />
      <div className={entityInfoStyles.entityInfoContent}>
        <EntityInfoDetails entityId={entityId} entityType="instanceTemplate" />
        <EntityInfoAppearances
          entityId={entityId}
          entityType="instanceTemplate"
        />
      </div>
    </div>
  );
};

export default InstanceTemplateInfo;
