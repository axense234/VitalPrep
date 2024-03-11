// Types
import TextFormControlProps from "@/core/interfaces/form/TextFormControlProps";
// React
import { FC } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";

const TextFormControl: FC<TextFormControlProps> = ({
  direction,
  labelColor,
  labelContent,
  type,
  required,
  entityProperty,
  onEntityPropertyValueChange,
}) => {
  return (
    <div
      className={formControlsStyles.textFormControlContainer}
      style={{ flexDirection: direction }}
    >
      <label htmlFor={labelContent} style={{ color: labelColor }}>
        {labelContent}
      </label>
      <input
        type={type}
        name={labelContent}
        min={8}
        max={110}
        minLength={3}
        maxLength={40}
        style={{ width: type === "number" ? "50%" : "100%" }}
        value={entityProperty}
        onChange={onEntityPropertyValueChange}
        required={required}
      />
    </div>
  );
};

export default TextFormControl;
