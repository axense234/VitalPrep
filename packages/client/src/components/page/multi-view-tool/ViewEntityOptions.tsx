// React
import { FC } from "react";
// SCSS
import viewEntityOptionsStyles from "../../../scss/components/shared/ViewEntityOptions.module.scss";
// Redux
import { useAppSelector } from "@/hooks/redux";
import {
  selectEntityQueryValues,
  selectSelectedEntityOption,
} from "@/redux/slices/generalSlice";
// Data
import { createToolOptions, entitySortingOptions } from "@/data";
// Types
import EntitySortingOptions from "@/core/types/entity/EntitySortingOptions";
// Components
import ViewEntityOptionsSearchEntity from "./ViewEntityOptionsSearchEntity";
import ViewEntityOptionsSortBy from "./ViewEntityOptionsSortBy";
import ViewEntityOptionsChooseEntity from "./ViewEntityOptionsChooseEntity";

const ViewEntityOptions: FC<{ viewMealPrepLog?: boolean }> = ({
  viewMealPrepLog = false,
}) => {
  const selectedEntityOption = useAppSelector(selectSelectedEntityOption);
  const viewEntityOptions = createToolOptions;
  const entityQueryValues = useAppSelector(selectEntityQueryValues);

  const entitySortingOptionsBasedOnSelectedEntityOption =
    entitySortingOptions[selectedEntityOption as keyof EntitySortingOptions];

  const entitySortingOptionUsed = viewMealPrepLog
    ? entitySortingOptions["mealPrepLog"]
    : entitySortingOptionsBasedOnSelectedEntityOption;

  return (
    <section className={viewEntityOptionsStyles.viewEntityOptionsContainer}>
      {!viewMealPrepLog && (
        <ViewEntityOptionsChooseEntity
          selectedEntityOption={selectedEntityOption}
          viewEntityOptions={viewEntityOptions}
        />
      )}
      <ViewEntityOptionsSortBy
        entityQueryValues={entityQueryValues}
        entitySortingOptionUsed={entitySortingOptionUsed}
        selectedEntityOption={
          viewMealPrepLog ? "mealPrepLog" : selectedEntityOption
        }
      />
      <ViewEntityOptionsSearchEntity entityQueryValues={entityQueryValues} />
    </section>
  );
};

export default ViewEntityOptions;
