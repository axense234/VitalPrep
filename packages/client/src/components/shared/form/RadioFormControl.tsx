// Types
import RadioFormControlProps from "@/core/interfaces/form/RadioFormControlProps";
// React
import { FC } from "react";
// SCSS
import formControlsStyles from "@/scss/components/others/FormControls.module.scss";

const RadioFormControl: FC<RadioFormControlProps> = ({
  labelContent,
  entityPropertyOptions,
  onEntityPropertyValueChange,
  chosenEntityProperty,
}) => {
  console.log(chosenEntityProperty);
  return (
    <div className={formControlsStyles.radioFormControlContainer}>
      <label htmlFor={labelContent}>{labelContent}</label>
      <ul className={formControlsStyles.radioFormControlContent}>
        {entityPropertyOptions.map((style) => {
          console.log(style.value.toLowerCase());
          return (
            <li key={style.label}>
              <input
                type="radio"
                name="notificationStyle"
                id={style.label}
                value={style.label}
                onChange={() => onEntityPropertyValueChange(style.value)}
                checked={chosenEntityProperty === style.value.toLowerCase()}
              />
              <label htmlFor={style.label}>{style.label}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RadioFormControl;
