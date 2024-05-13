// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoAppearances from "./EntityInfoAppearances";
import EntityInfoComponents from "./EntityInfoComponents";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {} from "@/redux/slices/recipesSlice";
import {
  getUserDayTemplate,
  selectLoadingGetUserDayTemplate,
} from "@/redux/slices/dayTemplatesSlice";

const DayTemplateInfo: FC<{ entityId: string; userId: string }> = ({
  entityId,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const loadingGetUserDayTemplate = useAppSelector(
    selectLoadingGetUserDayTemplate
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
      <div className={entityInfoStyles.entityInfoContent}>
        <EntityInfoDetails entityId={entityId} entityType="dayTemplate" />
        <EntityInfoComponents entityId={entityId} entityType="dayTemplate" />
        <EntityInfoAppearances entityId={entityId} entityType="dayTemplate" />
      </div>
    </div>
  );
};

export default DayTemplateInfo;
