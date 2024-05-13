"use client";

// SCSS
import multiViewToolStyles from "../../../scss/pages/MultiViewTool.module.scss";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Components
import PageTitle from "@/components/shared/PageTitle";
import MultiViewToolContent from "@/components/page/multi-view-tool/MultiViewToolContent";
import ViewEntityOptions from "@/components/page/entity/ViewEntityOptions";
// Redux
import { useAppSelector } from "@/hooks/redux";
import {
  selectProfile,
  selectSelectedEntityOption,
} from "@/redux/slices/generalSlice";
// Hooks
import useGetMultiViewToolContentEntities from "@/hooks/useGetMultiViewToolContentEntities";
// Helpers
import selectEntityIds from "@/helpers/selectEntityIds";

const MultiViewTool = () => {
  useAuthorization();
  const profile = useAppSelector(selectProfile);

  const entityType = useAppSelector(selectSelectedEntityOption);
  useGetMultiViewToolContentEntities(entityType, profile.id);

  const entityIds = selectEntityIds(entityType);

  return (
    <div className={multiViewToolStyles.multiViewToolContainer}>
      <PageTitle />
      <div className={multiViewToolStyles.multiViewToolContent}>
        <ViewEntityOptions />
        <MultiViewToolContent
          entityType={
            entityType as
              | "ingredient"
              | "utensil"
              | "recipe"
              | "dayTemplate"
              | "instanceTemplate"
              | "mealPrepPlan"
          }
          entityIds={entityIds}
        />
      </div>
    </div>
  );
};

export default MultiViewTool;
