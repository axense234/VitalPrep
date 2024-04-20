// Types
import RadioFormControlProps from "@/core/interfaces/form/RadioFormControlProps";
// React
import { FC } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";

const RadioFormControl: FC<RadioFormControlProps> = ({
  labelColor,
  labelContent,
  entityPropertyOptions,
  onEntityPropertyValueChange,
  labelFontSize,
  backgroundColor,
  border,
}) => {
  return (
    <div
      className={formControlsStyles.radioFormControlContainer}
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
      <ul className={formControlsStyles.radioFormControlContent}>
        {entityPropertyOptions.map((name, index) => {
          return (
            <li key={name}>
              <input
                type="radio"
                name="notificationStyle"
                id={name}
                value={name}
                onChange={() => onEntityPropertyValueChange(name)}
              />
              <label htmlFor={name}>{name}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RadioFormControl;
