// Types
import SelectFormControlProps from "@/core/interfaces/form/SelectFormControlProps";
// React
import { FC, useEffect } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";
// Components
import EntityComponent from "../entity/EntityComponent";
// React Spinners
import { ClockLoader } from "react-spinners";
// Helpers
import selectFormBackgroundColor from "@/helpers/selectFormBackgroundColor";

const SelectFormControl: FC<SelectFormControlProps> = ({
  labelColor,
  labelContent,
  entityPropertyOptions,
  entityPropertyChosenOptions,
  onEntityPropertyValueChange,
  labelFontSize,
  entityTypeUsed,
  areOptionsLoading,
  showEntityExtraCondition,
  backgroundColor,
  border,
}) => {
  const seeIfComponentHasBeenClicked = (id: string) => {
    if (showEntityExtraCondition) {
      return (
        Boolean(
          entityPropertyChosenOptions.find((idToSearch) => idToSearch === id)
        ) && showEntityExtraCondition(id)
      );
    }
    return Boolean(
      entityPropertyChosenOptions.find((idToSearch) => idToSearch === id)
    );
  };

  return (
    <div
      className={formControlsStyles.selectFormControlContainer}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "none",
        border: border ? border : "none",
      }}
    >
      <label
        htmlFor={labelContent}
        style={{
          color: labelColor,
          fontSize: labelFontSize || 22,
        }}
      >
        {labelContent}
      </label>
      {areOptionsLoading || entityPropertyOptions.length < 1 ? (
        <ClockLoader />
      ) : (
        <ul
          className={formControlsStyles.selectFormControlList}
          style={{ backgroundColor: selectFormBackgroundColor(entityTypeUsed) }}
        >
          {entityPropertyOptions.map((id) => {
            return (
              <li key={id} onClick={() => onEntityPropertyValueChange(id)}>
                <EntityComponent
                  clicked={seeIfComponentHasBeenClicked(id)}
                  entityId={id}
                  entityType={entityTypeUsed}
                  isALink={false}
                  selectedViewOption="list"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectFormControl;
