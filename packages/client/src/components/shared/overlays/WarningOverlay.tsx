// SCSS
import warningOverlayStyles from "@/scss/components/shared/WarningOverlay.module.scss";
// Redux
import {
  selectWarningOverlay,
  updateWarningOverlay,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// Hooks
import useOverlayTransition from "@/hooks/useOverlayTransition";
// React
import { useRef } from "react";

const WarningOverlay = () => {
  const dispatch = useAppDispatch();
  const warningOverlayRef = useRef<HTMLDivElement | null>(null);
  const warningOverlay = useAppSelector(selectWarningOverlay);

  useOverlayTransition(warningOverlay.showOverlay, warningOverlayRef);

  return (
    <div
      className={warningOverlayStyles.warningOverlayContainer}
      ref={warningOverlayRef}
    >
      <div className={warningOverlayStyles.warningOverlayContent}>
        <h6>{warningOverlay.overlayMessage}</h6>
        <div className={warningOverlayStyles.warningOverlayButtons}>
          <button
            type="button"
            onClick={() =>
              dispatch(
                updateWarningOverlay({ ...warningOverlay, showOverlay: false })
              )
            }
          >
            No
          </button>
          <button
            onClick={() => {
              dispatch(
                updateWarningOverlay({ ...warningOverlay, showOverlay: false })
              );
              warningOverlay.onConfirmFunction();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningOverlay;
