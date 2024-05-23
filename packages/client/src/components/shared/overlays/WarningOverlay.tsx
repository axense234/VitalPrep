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
import useCountdown from "@/hooks/useCountdown";
// React
import { FC, useRef } from "react";
// Translations
import { useTranslations } from "next-intl";

const WarningOverlay = () => {
  const dispatch = useAppDispatch();
  const warningOverlayRef = useRef<HTMLDivElement | null>(null);
  const warningOverlay = useAppSelector(selectWarningOverlay);

  const translateOverlay = useTranslations("warningOverlay");

  useOverlayTransition(warningOverlay.showOverlay, warningOverlayRef);
  const countdown = useCountdown(
    warningOverlay.countdownSeconds,
    warningOverlay.showOverlay
  );

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
            title={translateOverlay("buttons.titles.no")}
            aria-label={translateOverlay("buttons.titles.no")}
          >
            {translateOverlay("buttons.content.no")}
          </button>
          <button
            onClick={() => {
              dispatch(
                updateWarningOverlay({ ...warningOverlay, showOverlay: false })
              );
              warningOverlay.onConfirmFunction();
            }}
            disabled={countdown > 0}
            style={{
              filter: countdown > 0 ? "brigthness(0.1)" : "brightness(1)",
            }}
            title={translateOverlay("buttons.titles.yes")}
            aria-label={translateOverlay("buttons.titles.yes")}
          >
            {countdown <= 0
              ? translateOverlay("buttons.content.yes")
              : countdown}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningOverlay;
