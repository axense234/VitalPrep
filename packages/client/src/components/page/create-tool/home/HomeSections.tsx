// SCSS
import PrimaryButton from "@/components/shared/PrimaryButton";
import homeSectionsStyles from "../../../../scss/pages/Home.module.scss";
// React
import { FC } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Types
import HomeSectionContentProps from "@/core/interfaces/HomeSectionContentProps";
// Data
import { homeSectionsContent } from "@/data";

const HomeSections = () => {
  return (
    <div className={homeSectionsStyles.homeSectionsContainer}>
      {homeSectionsContent.map((homeSectionContent) => {
        if (homeSectionContent.type === "positional") {
          return (
            <HomeSectionPositional
              {...homeSectionContent}
              key={homeSectionContent.id}
            />
          );
        } else if (homeSectionContent.type === "descriptionBased") {
          return (
            <HomeSectionDescriptionBased
              {...homeSectionContent}
              key={homeSectionContent.id}
            />
          );
        } else if (homeSectionContent.type === "middle") {
          return (
            <HomeSectionMiddle
              {...homeSectionContent}
              key={homeSectionContent.id}
            />
          );
        }
      })}
    </div>
  );
};

const HomeSectionPositional: FC<HomeSectionContentProps> = ({
  backgroundImageSrc,
  ctaButtonContent,
  position,
  sectionDescription,
  sectionTitle,
  sectionSubTitle,
  contentBackgroundImageSrc,
}) => {
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
        <Image
          alt="Background Home Section Image"
          height={830}
          width={1125}
          src={contentBackgroundImageSrc as string}
        />
        <div
          className={homeSectionsStyles.homeSectionContentWrapper}
          style={{
            paddingLeft: position === "left" ? "8rem" : "0rem",
            paddingRight: position === "right" ? "8rem" : "0rem",
          }}
        >
          <div className={homeSectionsStyles.homeSectionContentDetails}>
            <header className={homeSectionsStyles.homeSectionContentHeader}>
              <h1>{sectionTitle}</h1>
              <h4>{sectionSubTitle}</h4>
            </header>
            <p>{sectionDescription}</p>
          </div>
          <PrimaryButton
            content={ctaButtonContent as string}
            disabled={false}
            type="link"
            linkDest="/guide"
          />
        </div>
      </div>
    </section>
  );
};

const HomeSectionMiddle: FC<HomeSectionContentProps> = ({
  sectionSubTitle,
  sectionTitle,
  sectionItems,
}) => {
  return (
    <section className={homeSectionsStyles.homeSectionContainer}>
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
            <h1 style={{ textAlign: "center" }}>{sectionTitle}</h1>
            <h4 style={{ textAlign: "center" }}>{sectionSubTitle}</h4>
          </header>
          <ul className={homeSectionsStyles.homeSectionContentItems}>
            {sectionItems?.map((sectionItem) => {
              return (
                <li
                  key={sectionItem.id}
                  className={homeSectionsStyles.homeSectionContentItem}
                >
                  <Image
                    alt={sectionItem.itemTitle}
                    src={sectionItem.imageSrc}
                    width={128}
                    height={128}
                  />
                  <div
                    className={homeSectionsStyles.homeSectionContentItemHeader}
                  >
                    <h4>{sectionItem.itemTitle}</h4>
                    <p>{sectionItem.itemDescription}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

const HomeSectionDescriptionBased: FC<HomeSectionContentProps> = ({
  backgroundImageSrc,
  position,
  sectionSubTitle,
  sectionTitle,
  contentBackgroundImageSrc,
}) => {
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
        <Image
          alt="Background Home Section Image"
          height={830}
          width={1125}
          src={contentBackgroundImageSrc as string}
        />
        <div
          className={homeSectionsStyles.homeSectionContentWrapper}
          style={{
            paddingLeft: position === "left" ? "8rem" : "0rem",
            paddingRight: position === "right" ? "8rem" : "0rem",
          }}
        >
          <div className={homeSectionsStyles.homeSectionContentDetails}>
            <header className={homeSectionsStyles.homeSectionContentHeader}>
              <h1>{sectionTitle}</h1>
              <h4>{sectionSubTitle}</h4>
            </header>
            <div className={homeSectionsStyles.homeSectionContentDescriptions}>
              <p>
                Given the app’s complexity, sometimes you will find yourself
                confused. We have a guide that serves as a way to help you use
                our app. Checkout the <Link href="/guide">Guide Page.</Link>
              </p>
              <p>
                In the case that you have a question about Meal Prepping in
                general that needs to be answered, we can help. Checkout the{" "}
                <Link href="/guide">FAQ Page.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSections;
