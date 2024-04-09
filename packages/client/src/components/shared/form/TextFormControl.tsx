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
  inputHeight,
  labelFontSize,
  maxInputLength,
  backgroundColor,
  border,
  padding,
}) => {
  return (
    <div
      className={formControlsStyles.textFormControlContainer}
      style={{
        flexDirection: direction,
        justifyContent: direction === "row" ? "space-between" : "center",
        backgroundColor: backgroundColor ? backgroundColor : "none",
        border: border ? border : "none",
        padding: padding ? padding : "0",
      }}
    >
      <label
        htmlFor={labelContent}
        style={{ color: labelColor, fontSize: labelFontSize || 22 }}
      >
        {labelContent}
      </label>
      <input
        type={type}
        name={labelContent}
        min={1}
        max={100}
        minLength={3}
        maxLength={maxInputLength || 40}
        style={{
          width: type === "number" ? "50%" : "100%",
          height: inputHeight || 24,
        }}
        value={entityProperty as string | number}
        onChange={onEntityPropertyValueChange}
        required={required}
      />
    </div>
  );
};

export default TextFormControl;
