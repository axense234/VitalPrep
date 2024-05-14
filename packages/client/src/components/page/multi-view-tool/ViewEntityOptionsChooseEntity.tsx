// SCSS
import viewEntityOptionsStyles from "../../../scss/components/shared/ViewEntityOptions.module.scss";
// Types
import EntityType from "@/core/types/entity/users/EntityType";
import CreateToolOption from "@/core/types/CreateToolOption";
// Redux
import { setSelectedEntityOption } from "@/redux/slices/generalSlice";
import { useAppDispatch } from "@/hooks/redux";
// React
import { FC } from "react";

const ViewEntityOptionsChooseEntity: FC<{
  selectedEntityOption: EntityType;
  viewEntityOptions: CreateToolOption[];
}> = ({ selectedEntityOption, viewEntityOptions }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={viewEntityOptionsStyles.chooseEntityOptionContainer}>
      <label htmlFor="chooseEntityOption">Selected Entity:</label>
      <select
        name="chooseEntityOption"
        id="chooseEntityOption"
        value={selectedEntityOption}
        onChange={(e) =>
          dispatch(setSelectedEntityOption(e.target.value as EntityType))
        }
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
  );
};

export default ViewEntityOptionsChooseEntity;
