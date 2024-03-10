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
// React Spinners
import { ClockLoader, MoonLoader } from "react-spinners";

const ImageFormControl: FC<ImageFormControlProps> = ({
  defaultImageUsedUrl,
  direction,
  labelColor,
  labelContent,
  entityPropertyLoadingStatus,
  entityProperty,
  onEntityPropertyValueChange,
}) => {
  console.log(entityPropertyLoadingStatus);
  return (
    <div
      className={formControlsStyles.imageFormControlContainer}
      style={{ flexDirection: direction }}
    >
      <label htmlFor={labelContent} style={{ color: labelColor }}>
        <span>{labelContent}</span>
      </label>
      <div className={formControlsStyles.imageInputContainer} tabIndex={0}>
        {entityPropertyLoadingStatus !== "PENDING" && (
          <div className={formControlsStyles.imageInputOverlay}>
            <FaPlus />
            <input
              type="file"
              id="imageInput"
              name="imageInput"
              onChange={onEntityPropertyValueChange}
            />
          </div>
        )}
        {entityPropertyLoadingStatus !== "PENDING" ? (
          <Image
            src={(entityProperty as string) || defaultImageUsedUrl}
            alt={labelContent}
            width={100}
            height={100}
          />
        ) : (
          <ClockLoader
            size={75}
            color="#000"
            title="Loading..."
            aria-label="Loading..."
          />
        )}
      </div>
    </div>
  );
};

export default ImageFormControl;
