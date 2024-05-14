// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import EntitySortingOption from "@/core/types/entity/EntitySortingOption";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { updateEntityQueryValues } from "@/redux/slices/generalSlice";
// React
import { FC } from "react";
// SCSS
import viewEntityOptionsStyles from "../../../scss/components/shared/ViewEntityOptions.module.scss";
// Components
import ViewEntityOptionsOrderBy from "./ViewEntityOptionsOrderBy";

const ViewEntityOptionsSortBy: FC<{
  entityQueryValues: EntityQueryValues;
  entitySortingOptionUsed: EntitySortingOption[];
}> = ({ entityQueryValues, entitySortingOptionUsed }) => {
  const dispatch = useAppDispatch();
  return (
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
        <ViewEntityOptionsOrderBy entityQueryValues={entityQueryValues} />
      </div>
    </div>
  );
};

export default ViewEntityOptionsSortBy;
