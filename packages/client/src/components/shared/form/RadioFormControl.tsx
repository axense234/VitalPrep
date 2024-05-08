// Types
import RadioFormControlProps from "@/core/interfaces/form/RadioFormControlProps";
// React
import { FC } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";

const RadioFormControl: FC<RadioFormControlProps> = ({
  labelContent,
  entityPropertyOptions,
  onEntityPropertyValueChange,
  chosenEntityProperty,
}) => {
  return (
    <div className={formControlsStyles.radioFormControlContainer}>
      <label htmlFor={labelContent}>{labelContent}</label>
      <ul className={formControlsStyles.radioFormControlContent}>
        {entityPropertyOptions.map((name) => {
          return (
            <li key={name}>
              <input
                type="radio"
                name="notificationStyle"
                id={name}
                value={name}
                onChange={() => onEntityPropertyValueChange(name)}
                checked={chosenEntityProperty === name.toLowerCase()}
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
