// SCSS
import multiViewToolStyles from "../../../scss/pages/MultiViewTool.module.scss";

// Components
import SortingOptions from "@/components/shared/SortingOptions";
import ViewTypeOptions from "@/components/shared/ViewTypeOptions";

const MealPrepLogsOptions = () => {
  return (
    <div className={multiViewToolStyles.multiViewToolOptionsContainer}>
      <ViewTypeOptions />
      <SortingOptions />
    </div>
  );
};

export default MealPrepLogsOptions;
