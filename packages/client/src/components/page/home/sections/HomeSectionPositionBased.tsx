// SCSS
import homeSectionsStyles from "../../../../scss/pages/Home.module.scss";
// Components
import PrimaryButton from "@/components/shared/PrimaryButton";
// Types
import HomeSectionContentProps from "@/core/interfaces/HomeSectionContentProps";
// Translations
import { useTranslations } from "next-intl";
// Next
import Image from "next/image";
// React
import { FC } from "react";

const HomeSectionPositionBased: FC<HomeSectionContentProps> = ({
  backgroundImageSrc,
  position,
  contentBackgroundImageSrc,
  sectionPaddingBasedOnWindowWidth,
  tabletAndPhoneRedesign,
  id,
  ctaButtonLinkDest,
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
            <p>{translate("sectionDescription")}</p>
          </div>
          <PrimaryButton
            content={translate("ctaButtonContent")}
            disabled={false}
            type="link"
            linkDest={ctaButtonLinkDest}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSectionPositionBased;
