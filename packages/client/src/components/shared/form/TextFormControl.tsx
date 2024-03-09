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
        style={{ width: type === "number" ? "50%" : "100%" }}
      />
    </div>
  );
};

export default TextFormControl;
