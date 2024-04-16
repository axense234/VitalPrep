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
import {
  getUserUtensil,
  selectLoadingGetUserUtensil,
} from "@/redux/slices/utensilsSlice";

const UtensilInfo: FC<{ entityId: string; userId: string }> = ({
  entityId,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const loadingGetUserUtensil = useAppSelector(selectLoadingGetUserUtensil);

  useEffect(() => {
    if (loadingGetUserUtensil === "IDLE" && userId && entityId) {
      dispatch(getUserUtensil({ userId, utensilId: entityId }));
    }
  }, [entityId, userId, loadingGetUserUtensil]);

  return (
    <div className={entityInfoStyles.entityInfoContainer}>
      <PageTitle
        titleContent="View Utensil"
        subtitleContent="your cooking tool"
      />
      <div className={entityInfoStyles.entityInfoContent}>
        <EntityInfoDetails entityId={entityId} entityType="utensil" />
        <EntityInfoAppearances entityId={entityId} entityType="utensil" />
      </div>
    </div>
  );
};

export default UtensilInfo;
