// SCSS
import multiViewToolStyles from "../../../scss/pages/MultiViewTool.module.scss";

// Components
import SortingOptions from "@/components/shared/SortingOptions";
import ViewTypeOptions from "@/components/shared/ViewTypeOptions";
import EntityOptions from "../../../../unused/EntityOptions";

const MultiViewToolOptions = () => {
  return (
    <div className={multiViewToolStyles.multiViewToolOptionsContainer}>
      <EntityOptions />
      <ViewTypeOptions />
      <SortingOptions />
    </div>
  );
};

export default MultiViewToolOptions;
