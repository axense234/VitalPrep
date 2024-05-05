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
import { ClockLoader } from "react-spinners";

const ImageFormControl: FC<ImageFormControlProps> = ({
  defaultImageUsedUrl,
  labelColor,
  labelContent,
  entityPropertyLoadingStatus,
  entityProperty,
  onEntityPropertyValueChange,
  onEntityPropertyOptionSelected,
  imageUrlOptions,
}) => {
  return (
    <div className={formControlsStyles.imageFormControlContainer}>
      <label htmlFor={labelContent} style={{ color: labelColor }}>
        {labelContent}
      </label>
      {imageUrlOptions && imageUrlOptions.length > 0 && (
        <ul className={formControlsStyles.imageUrlOptionsContainer}>
          {imageUrlOptions?.map((imageUrlOption) => {
            return (
              <li
                key={imageUrlOption.id}
                onClick={() => {
                  const onEntityPropertyOptionSelectedTyped =
                    onEntityPropertyOptionSelected as (
                      specifier: string
                    ) => undefined;
                  onEntityPropertyOptionSelectedTyped(imageUrlOption.imageUrl);
                }}
              >
                <Image
                  src={imageUrlOption.imageUrl}
                  alt={imageUrlOption.titleContent}
                  title={imageUrlOption.titleContent}
                  aria-label={imageUrlOption.titleContent}
                  width={100}
                  height={100}
                />
              </li>
            );
          })}
        </ul>
      )}
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
            width={80}
            height={80}
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
