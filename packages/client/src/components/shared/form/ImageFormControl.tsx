// React
import { FC } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";
// Types
import ImageFormControlProps from "@/core/interfaces/form/ImageFormControlProps";
// Next
import Image from "next/image";
// React Icons
import { FaPlus } from "react-icons/fa";

const ImageFormControl: FC<ImageFormControlProps> = ({
  defaultImageUsedUrl,
  direction,
  labelColor,
  labelContent,
}) => {
  return (
    <div
      className={formControlsStyles.imageFormControlContainer}
      style={{ flexDirection: direction }}
    >
      <label htmlFor={labelContent} style={{ color: labelColor }}>
        <span>{labelContent}</span>
      </label>
      <div className={formControlsStyles.imageInputContainer} tabIndex={0}>
        <div className={formControlsStyles.imageInputOverlay}>
          <FaPlus />
          <input type="file" id="imageInput" name="imageInput" />
        </div>
        <Image
          src={defaultImageUsedUrl}
          alt={labelContent}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default ImageFormControl;
