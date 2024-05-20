// React
import { Dispatch, FC, SetStateAction, useRef } from "react";
// SCSS
import homeSectionImageOverlayStyles from "../../../scss/pages/Home.module.scss";
// React Icons
import { AiFillCloseSquare } from "react-icons/ai";
// Next
import Image from "next/image";
// Hooks
import useOverlayTransition from "@/hooks/useOverlayTransition";

const HomeSectionImageOverlay: FC<{
  showCondition: boolean;
  showConditionUpdater: Dispatch<SetStateAction<boolean>>;
  translateFunction: any;
}> = ({ showCondition, showConditionUpdater, translateFunction }) => {
  const imageOverlayRef = useRef<HTMLDivElement | null>(null);
  useOverlayTransition(showCondition, imageOverlayRef);

  return (
    <div
      className={homeSectionImageOverlayStyles.homeSectionImageOverlay}
      ref={imageOverlayRef}
    >
      <button
        onClick={() => showConditionUpdater(false)}
        title={translateFunction("imageOverlay.closeOverlayTitle")}
        aria-label={translateFunction("imageOverlay.closeOverlayTitle")}
      >
        <AiFillCloseSquare />
      </button>
      <Image
        title={translateFunction("sectionImageTitle")}
        alt={translateFunction("sectionImageTitle")}
        aria-label={translateFunction("sectionImageTitle")}
        src={translateFunction("sectionImage")}
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default HomeSectionImageOverlay;
