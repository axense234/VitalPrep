// SCSS
import sortingOptionsStyles from "../../scss/components/shared/SortingOptions.module.scss";
// React Icons
import { FaArrowUp } from "react-icons/fa";
// Redux
import {
  selectEntityQueryValues,
  selectSelectedEntityOption,
  updateEntityQueryValues,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// Data
import { entitySearchByOptions, entitySortingOptions } from "@/data";
// Types
import EntitySortingOptions from "@/core/types/entity/EntitySortingOptions";

const SortingOptions = () => {
  const dispatch = useAppDispatch();
  const entityQueryValues = useAppSelector(selectEntityQueryValues);
  const selectedEntityOption = useAppSelector(selectSelectedEntityOption);

  const entitySortingOptionsBasedOnSelectedEntityOption =
    entitySortingOptions[selectedEntityOption as keyof EntitySortingOptions];

  const entitySearchByOptionsBasedOnSelectedEntityOption =
    entitySearchByOptions[selectedEntityOption as keyof EntitySortingOptions];

  return (
    <div className={sortingOptionsStyles.sortingOptionsContainer}>
      <section className={sortingOptionsStyles.sortBySortingOption}>
        <label htmlFor="sortBy">SORT BY:</label>
        <select
          name="sortBy"
          id="sortBy"
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
          {entitySortingOptionsBasedOnSelectedEntityOption.map(
            (entitySortingOption) => {
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
            }
          )}
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
                value: entityQueryValues.sortByOrder === "asc" ? "desc" : "asc",
              })
            )
          }
        >
          <FaArrowUp />
        </button>
      </section>
      <section className={sortingOptionsStyles.searchBySortingOption}>
        <label htmlFor="searchBy">SEARCH BY:</label>
        <select
          name="searchBy"
          id="searchBy"
          value={entityQueryValues.searchByKey}
          onChange={(e) =>
            dispatch(
              updateEntityQueryValues({
                key: "searchByKey",
                value: e.target.value,
              })
            )
          }
        >
          {entitySearchByOptionsBasedOnSelectedEntityOption.map(
            (entitySearchByOption) => {
              return (
                <option
                  key={entitySearchByOption.label}
                  value={entitySearchByOption.value}
                  title={`Search By: ${entitySearchByOption.label}`}
                  aria-label={`Search By: ${entitySearchByOption.label}`}
                >
                  {entitySearchByOption.label}
                </option>
              );
            }
          )}
        </select>
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
      </section>
    </div>
  );
};

export default SortingOptions;
