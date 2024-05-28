"use client";

// SCSS
import multiViewToolStyles from "@/scss/pages/MultiViewTool.module.scss";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Components
import PageTitle from "@/components/shared/PageTitle";
import MultiViewToolContent from "@/components/page/multi-view-tool/MultiViewToolContent";
import ViewEntityOptions from "@/components/page/multi-view-tool/ViewEntityOptions";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectSelectedEntityOption } from "@/redux/slices/general/selectors";
// Hooks
import useGetMultiViewToolContentEntities from "@/hooks/useGetMultiViewToolContentEntities";
// Helpers
import selectEntityIds from "@/helpers/selectEntityIds";

const MultiViewTool = () => {
  useAuthorization();

  const entityType = useAppSelector(selectSelectedEntityOption);
  useGetMultiViewToolContentEntities();

  const entityIds = selectEntityIds(entityType);

  return (
    <div className={multiViewToolStyles.multiViewToolContainer}>
      <PageTitle />
      <div className={multiViewToolStyles.multiViewToolContent}>
        <ViewEntityOptions />
        <MultiViewToolContent entityType={entityType} entityIds={entityIds} />
      </div>
    </div>
  );
};

export default MultiViewTool;
