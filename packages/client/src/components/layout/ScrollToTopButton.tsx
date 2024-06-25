// SCSS
import sttButtonStyles from "@/scss/components/layout/ScrollToTopButton.module.scss";
// React Icons
import { GoChevronUp } from "react-icons/go";
// Translations
import { useTranslations } from "next-intl";
// Transitions
import { useInView } from "react-intersection-observer";
import usePopInAnimation from "@/hooks/usePopInTransition";

const ScrollToTopButton = () => {
  const translate = useTranslations("sttButton");
  const { ref: buttonRef, inView, entry } = useInView();
  usePopInAnimation("showLTR", inView, entry);

  return (
    <div
      className={`${sttButtonStyles.sttButtonContainer} hiddenLTR`}
      title={translate("title")}
      aria-label={translate("title")}
      ref={buttonRef}
    >
      <GoChevronUp
        onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
      />
    </div>
  );
};

export default ScrollToTopButton;
