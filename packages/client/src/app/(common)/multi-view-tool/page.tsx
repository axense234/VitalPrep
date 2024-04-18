"use client";

// SCSS
import multiViewToolStyles from "../../../scss/pages/MultiViewTool.module.scss";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Components
import PageTitle from "@/components/shared/PageTitle";
import MultiViewToolOptions from "@/components/page/multi-view-tool/MultiViewToolOptions";
import MultiViewToolContent from "@/components/page/multi-view-tool/MultiViewToolContent";
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
      <PageTitle
        titleContent="Multi-View Tool"
        subtitleContent="view all the entities you have created"
      />
      <div className={multiViewToolStyles.multiViewToolContent}>
        <MultiViewToolOptions />
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