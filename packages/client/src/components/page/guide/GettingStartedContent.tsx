// SCSS
import gettingStartedContentStyles from "@/scss/pages/GettingStarted.module.scss";
// Redux
import { selectCurrentGuideSection } from "@/redux/slices/general/selectors";
import { useAppSelector } from "@/hooks/redux";
// Components
import GettingStartedContentBasics from "./sections/GettingStartedContentBasics";
import GettingStartedContentEntities from "./sections/GettingStartedContentEntities";
import GettingStartedContentSessionLogs from "./sections/GettingStartedContentSessionLogs";
import GettingStartedContentExtras from "./sections/GettingStartedContentExtras";
import GettingStartedNavigationButtons from "./GettingStartedNavigationButtons";
// React
import { useRef } from "react";

const GettingStartedContent = () => {
  const currentGuideSection = useAppSelector(selectCurrentGuideSection);
  const currentGuideSectionRef = useRef<HTMLElement | null>(null);

  let sectionShown = (
    <GettingStartedContentBasics
      currentGuideSectionRef={currentGuideSectionRef}
    />
  );

  switch (currentGuideSection) {
    case "basics":
      sectionShown = (
        <GettingStartedContentBasics
          currentGuideSectionRef={currentGuideSectionRef}
        />
      );
      break;
    case "entities":
      sectionShown = (
        <GettingStartedContentEntities
          currentGuideSectionRef={currentGuideSectionRef}
        />
      );
      break;
    case "logs":
      sectionShown = (
        <GettingStartedContentSessionLogs
          currentGuideSectionRef={currentGuideSectionRef}
        />
      );
      break;
    case "extras":
      sectionShown = (
        <GettingStartedContentExtras
          currentGuideSectionRef={currentGuideSectionRef}
        />
      );
      break;
    default:
      throw new Error("Invalid currentGuideSection!");
  }

  return (
    <section
      className={gettingStartedContentStyles.gettingStartedContentContainer}
    >
      {sectionShown}
      <GettingStartedNavigationButtons
        currentGuideSectionRef={currentGuideSectionRef}
      />
    </section>
  );
};

export default GettingStartedContent;
