// SCSS
import gettingStartedContentStyles from "@/scss/pages/GettingStarted.module.scss";
// React Icons
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectCurrentGuideSection } from "@/redux/slices/general/selectors";
import { changeCurrentGuideSection } from "@/redux/slices/general/slice";
// Data
import { gettingStartedGuideContentMapContent } from "@/data";
// Types
import { SectionValueType } from "@/core/types/GettingStartedContentMapContentType";
import GettingStartedContentSectionProps from "@/core/interfaces/GettingStartedContentSectionProps";
// React
import { FC } from "react";
// Translations
import { useTranslations } from "next-intl";

const GettingStartedNavigationButtons: FC<
  GettingStartedContentSectionProps
> = ({ currentGuideSectionRef }) => {
  const dispatch = useAppDispatch();
  const currentGuideSectionValue = useAppSelector(selectCurrentGuideSection);
  const currentGuideSectonId =
    gettingStartedGuideContentMapContent.find(
      (section) => section.sectionValue === currentGuideSectionValue
    )?.id || 1;
  const highestPossibleSectionValueId =
    gettingStartedGuideContentMapContent.at(-1)?.id || 1;

  const translate = useTranslations("gettingStarted.navigationButtons.titles");

  const navigateToPrevGuideSection = () => {
    dispatch(
      changeCurrentGuideSection(
        currentGuideSectonId === 1
          ? (gettingStartedGuideContentMapContent.at(-1)
              ?.sectionValue as SectionValueType)
          : (gettingStartedGuideContentMapContent.find(
              (section) => section.id === currentGuideSectonId - 1
            )?.sectionValue as SectionValueType)
      )
    );
    currentGuideSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToNextGuideSection = () => {
    dispatch(
      changeCurrentGuideSection(
        currentGuideSectonId === highestPossibleSectionValueId
          ? (gettingStartedGuideContentMapContent.find(
              (section) => section.id === 1
            )?.sectionValue as SectionValueType)
          : (gettingStartedGuideContentMapContent.find(
              (section) => section.id === currentGuideSectonId + 1
            )?.sectionValue as SectionValueType)
      )
    );
    currentGuideSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={
        gettingStartedContentStyles.gettingStartedNavigationButtonsContainer
      }
    >
      <FaArrowAltCircleLeft
        onClick={() => navigateToPrevGuideSection()}
        title={translate("prevButton")}
        aria-label={translate("prevButton")}
      />
      <FaArrowAltCircleRight
        onClick={() => navigateToNextGuideSection()}
        title={translate("nextButton")}
        aria-label={translate("nextButton")}
      />
    </div>
  );
};

export default GettingStartedNavigationButtons;
