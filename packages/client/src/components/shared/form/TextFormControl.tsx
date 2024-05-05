// Types
import TextFormControlProps from "@/core/interfaces/form/TextFormControlProps";
// React
import { FC } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";

const TextFormControl: FC<TextFormControlProps> = ({
  labelContent,
  type,
  entityProperty,
  onEntityPropertyValueChange,
  maxInputLength,
}) => {
  return (
    <div className={formControlsStyles.textFormControlContainer}>
      <label htmlFor={labelContent}>{labelContent}</label>
      <input
        type={type}
        name={labelContent}
        min={1}
        max={100}
        minLength={3}
        maxLength={maxInputLength || 40}
        style={{
          width: type === "number" ? "50%" : "100%",
        }}
        value={entityProperty as string | number}
        onChange={onEntityPropertyValueChange}
      />
    </div>
  );
};

export default TextFormControl;
