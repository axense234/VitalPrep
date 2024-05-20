// SCSS
import homeSectionsStyles from "../../../../scss/pages/Home.module.scss";
// React
import { FC } from "react";
// Next
import Image from "next/image";
// Types
import HomeSectionContentProps from "@/core/interfaces/HomeSectionContentProps";
// Translations
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const HomeSectionDescriptionBased: FC<HomeSectionContentProps> = ({
  backgroundImageSrc,
  position,
  contentBackgroundImageSrc,
  sectionPaddingBasedOnWindowWidth,
  tabletAndPhoneRedesign,
  id,
}) => {
  const translate = useTranslations(`home.sections.section-${id}`);
  return (
    <section
      className={homeSectionsStyles.homeSectionContainer}
      style={{
        justifyContent: position === "left" ? "flex-start" : "flex-end",
        backgroundImage: `url(${backgroundImageSrc})`,
      }}
    >
      <div
        className={homeSectionsStyles.homeSectionContent}
        style={{
          alignItems: position === "left" ? "flex-start" : "flex-end",
        }}
      >
        {!tabletAndPhoneRedesign ? (
          <Image
            alt="Background Home Section Image"
            height={830}
            width={1125}
            src={contentBackgroundImageSrc as string}
          />
        ) : null}
        <div
          className={homeSectionsStyles.homeSectionContentWrapper}
          style={{
            paddingLeft:
              position === "left" ? sectionPaddingBasedOnWindowWidth : "0rem",
            paddingRight:
              position === "right" ? sectionPaddingBasedOnWindowWidth : "0rem",
          }}
        >
          <div className={homeSectionsStyles.homeSectionContentDetails}>
            <header className={homeSectionsStyles.homeSectionContentHeader}>
              <h1>{translate("sectionTitle")}</h1>
              <h4>{translate("sectionSubTitle")}</h4>
            </header>
            <div className={homeSectionsStyles.homeSectionContentDescriptions}>
              <p>
                {translate("appHelpDescription")}
                <Link href="/guide">{translate("appHelpLinkLabel")}.</Link>
              </p>
              <p>
                {translate("mealPrepHelpDescription")}
                <Link href="/faq">{translate("mealPrepHelpLinkLabel")}.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSectionDescriptionBased;
