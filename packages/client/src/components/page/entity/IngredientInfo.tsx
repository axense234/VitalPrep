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
  getUserIngredient,
  selectLoadingGetUserIngredient,
} from "@/redux/slices/ingredientsSlice";

const IngredientInfo: FC<{ entityId: string; userId: string }> = ({
  entityId,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const loadingGetUserIngredient = useAppSelector(
    selectLoadingGetUserIngredient
  );

  useEffect(() => {
    if (loadingGetUserIngredient === "IDLE" && userId && entityId) {
      dispatch(getUserIngredient({ userId, ingredientId: entityId }));
    }
  }, [entityId, userId, loadingGetUserIngredient]);

  return (
    <div className={entityInfoStyles.entityInfoContainer}>
      <PageTitle />
      <div className={entityInfoStyles.entityInfoContent}>
        <EntityInfoDetails entityId={entityId} entityType="ingredient" />
        <EntityInfoAppearances entityId={entityId} entityType="ingredient" />
      </div>
    </div>
  );
};

export default IngredientInfo;
