// SCSS
import gettingStartedContentMapStyles from "../../../scss/pages/GettingStarted.module.scss";
// Data
import { gettingStartedGuideContentMapContent } from "@/data";
// Next
import Link from "next/link";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  changeCurrentGuideSection,
  selectCurrentGuideSection,
} from "@/redux/slices/generalSlice";

const GettingStartedContentMap = () => {
  const dispatch = useAppDispatch();
  const currentGuideSection = useAppSelector(selectCurrentGuideSection);

  return (
    <section
      className={
        gettingStartedContentMapStyles.gettingStartedContentMapContainer
      }
    >
      <h5>Guide Contents</h5>
      <ul
        className={
          gettingStartedContentMapStyles.gettingStartedContentMapSections
        }
      >
        {gettingStartedGuideContentMapContent.map((guideSection) => {
          return (
            <li
              key={guideSection.id + guideSection.sectionLabel}
              className={
                gettingStartedContentMapStyles.gettingStartedContentMapSection
              }
            >
              <h6
                onClick={() =>
                  dispatch(changeCurrentGuideSection(guideSection.sectionValue))
                }
                style={{
                  color:
                    currentGuideSection === guideSection.sectionValue
                      ? "blue"
                      : "black",
                }}
              >
                {guideSection.id}. {guideSection.sectionLabel}
              </h6>
              <ul
                className={
                  gettingStartedContentMapStyles.gettingStartedContentMapSectionContent
                }
              >
                {guideSection.sectionContent.map((section) => {
                  return (
                    <li key={section.orderLetter + section.subsectionLabel}>
                      <Link href={section.subsectionLinkDest}>
                        <p>
                          {section.orderLetter}. {section.subsectionLabel}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default GettingStartedContentMap;
