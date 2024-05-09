// React
import { FC } from "react";
// SCSS
import viewEntityOptionsStyles from "../../../scss/components/shared/ViewEntityOptions.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  changeSelectedViewOption,
  selectEntityQueryValues,
  selectSelectedEntityOption,
  setSelectedEntityOption,
  updateEntityQueryValues,
} from "@/redux/slices/generalSlice";
// Data
import { createToolOptions, entitySortingOptions } from "@/data";
// Types
import EntitySortingOptions from "@/core/types/entity/EntitySortingOptions";
// React Icons
import { FaArrowUp } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { TfiViewListAlt } from "react-icons/tfi";
import { FaMagnifyingGlass } from "react-icons/fa6";

const ViewEntityOptions: FC<{ viewMealPrepLog?: boolean }> = ({
  viewMealPrepLog = false,
}) => {
  const dispatch = useAppDispatch();
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
        <div className={viewEntityOptionsStyles.chooseEntityOptionContainer}>
          <label htmlFor="chooseEntityOption">Selected Entity:</label>
          <select
            name="chooseEntityOption"
            id="chooseEntityOption"
            value={selectedEntityOption}
            onChange={(e) => dispatch(setSelectedEntityOption(e.target.value))}
          >
            {viewEntityOptions.map((entityOption) => {
              return (
                <option value={entityOption.optionValue}>
                  {entityOption.label}
                </option>
              );
            })}
          </select>
        </div>
      )}
      <div className={viewEntityOptionsStyles.sortByEntityPropertyContainer}>
        <label htmlFor="sortByOptions">Sort By:</label>
        <div
          className={viewEntityOptionsStyles.sortByEntityPropertyContainerOrder}
        >
          <select
            name="sortByOptions"
            id="sortByOptions"
            value={entityQueryValues.sortByKey}
            onChange={(e) =>
              dispatch(
                updateEntityQueryValues({
                  key: "sortByKey",
                  value: e.target.value,
                })
              )
            }
          >
            {entitySortingOptionUsed.map((entitySortingOption) => {
              return (
                <option
                  key={entitySortingOption.label}
                  value={entitySortingOption.value}
                  title={`Sort By: ${entitySortingOption.label}`}
                  aria-label={`Sort By: ${entitySortingOption.label}`}
                >
                  {entitySortingOption.label}
                </option>
              );
            })}
          </select>
          <button
            type="button"
            title={`Current Order: ${entityQueryValues.sortByOrder === "asc" ? "Ascending" : "Descending"}`}
            aria-label={`Current Order: ${entityQueryValues.sortByOrder === "asc" ? "Ascending" : "Descending"}`}
            style={{
              transform:
                entityQueryValues.sortByOrder === "asc"
                  ? "rotate(0deg)"
                  : "rotate(180deg)",
            }}
            onClick={() =>
              dispatch(
                updateEntityQueryValues({
                  key: "sortByOrder",
                  value:
                    entityQueryValues.sortByOrder === "asc" ? "desc" : "asc",
                })
              )
            }
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
      <div className={viewEntityOptionsStyles.searchEntityContainer}>
        <label htmlFor="searchEntity">Search:</label>
        <div className={viewEntityOptionsStyles.searchEntityInputContainer}>
          <input
            type="text"
            value={entityQueryValues.searchByValue}
            onChange={(e) =>
              dispatch(
                updateEntityQueryValues({
                  key: "searchByValue",
                  value: e.target.value,
                })
              )
            }
          />
          <FaMagnifyingGlass title="Search" aria-label="Search" />
        </div>
        <div className={viewEntityOptionsStyles.entityViewTypeContainer}>
          <MdGridView
            onClick={() => dispatch(changeSelectedViewOption("grid"))}
            title="Change View Option to Grid"
            aria-label="Change View Option to Grid"
          />
          <TfiViewListAlt
            onClick={() => dispatch(changeSelectedViewOption("list"))}
            title="Change View Option to List"
            aria-label="Change View Option to List"
          />
        </div>
      </div>
    </section>
  );
};

export default ViewEntityOptions;
