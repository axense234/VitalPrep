// Types
import CheckboxFormControlProps from "@/core/interfaces/form/CheckboxFormControlProps";
// React
import { FC } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";

const CheckboxFormControl: FC<CheckboxFormControlProps> = ({
  direction,
  labelColor,
  labelContent,
  entityProperty,
  onEntityPropertyValueChange,
  labelFontSize,
}) => {
  return (
    <div
      className={formControlsStyles.checkboxFormControlContainer}
      style={{ flexDirection: direction }}
    >
      <label
        htmlFor={labelContent}
        style={{ color: labelColor, fontSize: labelFontSize || 22 }}
      >
        {labelContent}
      </label>
      <input
        type="checkbox"
        name={labelContent}
        id={labelContent}
        value={entityProperty}
        onChange={onEntityPropertyValueChange}
      />
    </div>
  );
};

export default CheckboxFormControl;
