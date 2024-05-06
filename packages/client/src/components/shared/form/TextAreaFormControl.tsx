// React
import { FC } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";
// Types
import TextAreaFormControlProps from "@/core/interfaces/form/TextAreaFormControlProps";

const TextAreaFormControl: FC<TextAreaFormControlProps> = ({
  entityProperty,
  labelContent,
  onEntityPropertyValueChange,
  maxInputLength,
}) => {
  return (
    <div className={formControlsStyles.textAreaFormControlContainer}>
      <label htmlFor={labelContent}>{labelContent}</label>
      <textarea
        name={labelContent}
        minLength={3}
        maxLength={maxInputLength || 40}
        value={entityProperty}
        onChange={onEntityPropertyValueChange}
      />
    </div>
  );
};

export default TextAreaFormControl;
