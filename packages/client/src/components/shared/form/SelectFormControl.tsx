// Types
import SelectFormControlProps from "@/core/interfaces/form/SelectFormControlProps";
// React
import { FC, FunctionComponent } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";
import IngredientComponent from "../entity/IngredientComponent";
import { ClockLoader } from "react-spinners";

const SelectFormControl: FC<SelectFormControlProps> = ({
  labelColor,
  labelContent,
  required,
  entityProperty,
  onEntityPropertyValueChange,
  labelFontSize,
  entityTypeUsed,
  areOptionsLoading,
}) => {
  let componentUsedAsOption: FunctionComponent<any> = IngredientComponent;

  switch (entityTypeUsed) {
    case "ingredient":
      componentUsedAsOption = IngredientComponent;
      break;
    case "utensil":
      break;

    default:
      throw new Error("Invalid entity typed used on the select form control!");
  }

  return (
    <div className={formControlsStyles.selectFormControlContainer}>
      <label
        htmlFor={labelContent}
        style={{ color: labelColor, fontSize: labelFontSize || 22 }}
      >
        {labelContent}
      </label>
      {areOptionsLoading ? (
        <ClockLoader />
      ) : (
        <ul className={formControlsStyles.selectFormControlList}>
          {entityProperty.map((id) => {
            return (
              <li key={id} onClick={onEntityPropertyValueChange}>
                {componentUsedAsOption({ id: id })}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectFormControl;
