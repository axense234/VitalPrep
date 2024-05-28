// SCSS
import gettingStartedContentStyles from "../../../scss/pages/GettingStarted.module.scss";
// Reduxx
import { selectCurrentGuideSection } from "@/redux/slices/general/selectors";
import { useAppSelector } from "@/hooks/redux";
// Components
import GettingStartedContentBasics from "./sections/GettingStartedContentBasics";
import GettingStartedContentEntities from "./sections/GettingStartedContentEntities";
import GettingStartedContentSessionLogs from "./sections/GettingStartedContentSessionLogs";
import GettingStartedContentExtras from "./sections/GettingStartedContentExtras";

const GettingStartedContent = () => {
  const currentGuideSection = useAppSelector(selectCurrentGuideSection);

  let sectionShown = <GettingStartedContentBasics />;

  switch (currentGuideSection) {
    case "basics":
      sectionShown = <GettingStartedContentBasics />;
      break;
    case "entities":
      sectionShown = <GettingStartedContentEntities />;
      break;
    case "logs":
      sectionShown = <GettingStartedContentSessionLogs />;
      break;
    case "extras":
      sectionShown = <GettingStartedContentExtras />;
      break;
    default:
      throw new Error("Invalid currentGuideSection!");
  }

  return (
    <section
      className={gettingStartedContentStyles.gettingStartedContentContainer}
    >
      {sectionShown}
    </section>
  );
};

export default GettingStartedContent;
