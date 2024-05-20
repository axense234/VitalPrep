// SCSS
import homeSectionsStyles from "../../../../scss/pages/Home.module.scss";
// Types
import HomeSectionContentProps from "@/core/interfaces/HomeSectionContentProps";
// Translations
import { useTranslations } from "next-intl";
// React
import { FC, useState } from "react";
// Next
import Image from "next/image";
// Components
import HomeSectionImageOverlay from "@/components/shared/overlays/HomeSectionImageOverlay";

const HomeSectionImageBased: FC<HomeSectionContentProps> = ({
  id,
  sectionDescriptions,
}) => {
  const translate = useTranslations(`home.sections.section-${id}`);
  const [isImageFullscreen, setIsImageFullscreen] = useState<boolean>(false);

  return (
    <section
      className={homeSectionsStyles.homeSectionContainer}
      style={{ minHeight: "65rem", height: "auto", backgroundColor: "#FFAE00" }}
    >
      <HomeSectionImageOverlay
        showCondition={isImageFullscreen}
        showConditionUpdater={setIsImageFullscreen}
        translateFunction={translate}
      />
      <div
        className={homeSectionsStyles.homeSectionContent}
        style={{ width: "100%" }}
      >
        <div className={homeSectionsStyles.homeSectionMiddleContentDetails}>
          <header
            className={homeSectionsStyles.homeSectionContentHeader}
            style={{
              alignItems: "center",
            }}
          >
            <h2 style={{ textAlign: "center" }}>{translate("sectionTitle")}</h2>
            <h4 style={{ textAlign: "center" }}>
              {translate("sectionSubTitle")}
            </h4>
          </header>
          <div className={homeSectionsStyles.homeSectionImageBasedContent}>
            <ul
              className={homeSectionsStyles.homeSectionImageBasedDescriptions}
            >
              {sectionDescriptions?.map((description) => {
                return (
                  <li key={description.id}>
                    <p>{translate(`sectionDescriptions.${description.id}`)}</p>
                  </li>
                );
              })}
            </ul>
            <Image
              src={translate("sectionImage")}
              title={translate("sectionImageTitle")}
              alt={translate("sectionImageTitle")}
              aria-label={translate("sectionImageTitle")}
              width={720}
              height={509}
              onClick={() => setIsImageFullscreen(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSectionImageBased;
