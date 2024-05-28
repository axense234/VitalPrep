// Types
import CheckboxFormControlProps from "@/core/interfaces/form/CheckboxFormControlProps";
// React
import { FC } from "react";
// SCSS
import formControlsStyles from "@/scss/components/others/FormControls.module.scss";

const CheckboxFormControl: FC<CheckboxFormControlProps> = ({
  labelContent,
  entityProperty,
  onEntityPropertyValueChange,
}) => {
  return (
    <div className={formControlsStyles.checkboxFormControlContainer}>
      <label htmlFor={labelContent}>{labelContent}</label>
      <input
        type="checkbox"
        name={labelContent}
        id={labelContent}
        value={entityProperty}
        onChange={onEntityPropertyValueChange}
        checked={entityProperty === "true" ? true : false}
      />
    </div>
  );
};

export default CheckboxFormControl;
