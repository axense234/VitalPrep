// React
import { FC } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";
// Components
import TextFormControl from "./TextFormControl";
// Types
import VideoFormControlProps from "@/core/interfaces/form/VideoFormControlProps";
// Hooks
import useVideoUrlFormat from "@/hooks/useVideoUrlFormat";

const VideoFormControl: FC<VideoFormControlProps> = ({
  direction,
  entityProperty,
  labelColor,
  labelContent,
  onEntityPropertyValueChange,
  onEntityPropertyValueUpdate,
  inputHeight,
  labelFontSize,
}) => {
  useVideoUrlFormat(entityProperty || "", onEntityPropertyValueUpdate);

  return (
    <div className={formControlsStyles.videoFormControlContainer}>
      <TextFormControl
        direction={direction}
        labelColor={labelColor}
        labelContent={labelContent}
        type="url"
        required={false}
        inputHeight={inputHeight}
        labelFontSize={labelFontSize}
        entityProperty={entityProperty}
        onEntityPropertyValueChange={onEntityPropertyValueChange}
        maxInputLength={1000}
      />
      {entityProperty && (
        <iframe
          src={entityProperty as string}
          title={labelContent}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default VideoFormControl;
