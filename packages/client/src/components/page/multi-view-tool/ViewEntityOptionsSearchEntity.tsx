// React
import { FC } from "react";
// SCSS
import viewEntityOptionsStyles from "../../../scss/components/shared/ViewEntityOptions.module.scss";
// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { updateEntityQueryValues } from "@/redux/slices/generalSlice";
// React Icons and Components
import { FaMagnifyingGlass } from "react-icons/fa6";
import ViewEntityOptionsViewType from "./ViewEntityOptionsViewType";

const ViewEntityOptionsSearchEntity: FC<{
  entityQueryValues: EntityQueryValues;
}> = ({ entityQueryValues }) => {
  const dispatch = useAppDispatch();
  return (
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
      <ViewEntityOptionsViewType />
    </div>
  );
};

export default ViewEntityOptionsSearchEntity;
