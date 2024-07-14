// SCSS
import gettingStartedContentMapStyles from "@/scss/pages/GettingStarted.module.scss";
// Data
import { gettingStartedGuideContentMapContent } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectCurrentGuideSection } from "@/redux/slices/general/selectors";
import { changeCurrentGuideSection } from "@/redux/slices/general/slice";
// Translations
import { useTranslations } from "next-intl";

const GettingStartedContentMap = () => {
  const dispatch = useAppDispatch();
  const currentGuideSection = useAppSelector(selectCurrentGuideSection);
  const translate = useTranslations("gettingStarted.contentMap");

  return (
    <section
      className={
        gettingStartedContentMapStyles.gettingStartedContentMapContainer
      }
    >
      <h5>{translate("title")}</h5>
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
                title={translate("sectionTitleLabel", {
                  section: translate(`${guideSection.sectionValue}.title`),
                })}
                aria-label={translate("sectionTitleLabel", {
                  section: translate(`${guideSection.sectionValue}.title`),
                })}
              >
                {guideSection.id}.{" "}
                {translate(`${guideSection.sectionValue}.title`)}
              </h6>
              <ul
                className={
                  gettingStartedContentMapStyles.gettingStartedContentMapSectionContent
                }
              >
                {guideSection.sectionContent.map((section) => {
                  return (
                    <li key={section.orderLetter + section.subsectionLabel}>
                      <p>
                        {section.orderLetter}.{" "}
                        {translate(
                          `${guideSection.sectionValue}.${section.orderLetter}.linkLabel`
                        )}
                      </p>
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
