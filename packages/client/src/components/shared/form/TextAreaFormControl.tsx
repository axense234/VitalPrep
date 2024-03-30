// React
import { FC } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";
// Types
import TextAreaFormControlProps from "@/core/interfaces/form/TextAreaFormControlProps";

const TextAreaFormControl: FC<TextAreaFormControlProps> = ({
  direction,
  entityProperty,
  labelColor,
  labelContent,
  onEntityPropertyValueChange,
  inputHeight,
  labelFontSize,
  maxInputLength,
}) => {
  return (
    <div
      className={formControlsStyles.textAreaFormControlContainer}
      style={{
        flexDirection: direction,
        justifyContent: direction === "row" ? "space-between" : "center",
      }}
    >
      <label
        htmlFor={labelContent}
        style={{ color: labelColor, fontSize: labelFontSize || 22 }}
      >
        {labelContent}
      </label>
      <textarea
        name={labelContent}
        minLength={3}
        maxLength={maxInputLength || 40}
        style={{
          height: inputHeight || 24,
        }}
        value={entityProperty}
        onChange={onEntityPropertyValueChange}
      />
    </div>
  );
};

export default TextAreaFormControl;
