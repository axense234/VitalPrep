"use client";
// SCSS
import homeSectionsStyles from "@/scss/pages/Home.module.scss";
// Data
import { homeSectionsContent } from "@/data";
// Hooks
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
// Components
import HomeSectionDescriptionBased from "./sections/HomeSectionDescriptionBased";
import HomeSectionImageBased from "./sections/HomeSectionImageBased";
import HomeSectionItemsBased from "./sections/HomeSectionItemsBased";
import HomeSectionPositionBased from "./sections/HomeSectionPositionBased";

const HomeSections = () => {
  const { sectionPaddingBasedOnWindowWidth, tabletAndPhoneRedesign } =
    useGetSectionPaddingBasedOnWindowWidth();

  return (
    <div className={homeSectionsStyles.homeSectionsContainer}>
      {homeSectionsContent.map((homeSectionContent) => {
        if (homeSectionContent.type === "positional") {
          return (
            <HomeSectionPositionBased
              {...homeSectionContent}
              key={homeSectionContent.id}
              sectionPaddingBasedOnWindowWidth={
                sectionPaddingBasedOnWindowWidth
              }
              tabletAndPhoneRedesign={tabletAndPhoneRedesign || false}
            />
          );
        } else if (homeSectionContent.type === "descriptionBased") {
          return (
            <HomeSectionDescriptionBased
              {...homeSectionContent}
              key={homeSectionContent.id}
              sectionPaddingBasedOnWindowWidth={
                sectionPaddingBasedOnWindowWidth
              }
              tabletAndPhoneRedesign={tabletAndPhoneRedesign || false}
            />
          );
        } else if (homeSectionContent.type === "middle") {
          return (
            <HomeSectionItemsBased
              {...homeSectionContent}
              key={homeSectionContent.id}
            />
          );
        } else if (homeSectionContent.type === "imageBased") {
          return (
            <HomeSectionImageBased
              {...homeSectionContent}
              key={homeSectionContent.id}
            />
          );
        }
      })}
    </div>
  );
};

const useGetSectionPaddingBasedOnWindowWidth = () => {
  const windowWidth = useGetWindowWidth();

  let sectionPaddingBasedOnWindowWidth = "6rem";
  let tabletAndPhoneRedesign = windowWidth && windowWidth <= 1200;

  if (windowWidth && windowWidth <= 1500) {
    sectionPaddingBasedOnWindowWidth = "4rem";
  }
  if (windowWidth && windowWidth <= 1300) {
    sectionPaddingBasedOnWindowWidth = "1.8rem";
  }
  if (windowWidth && windowWidth <= 1200) {
    sectionPaddingBasedOnWindowWidth = "0";
  }

  return { sectionPaddingBasedOnWindowWidth, tabletAndPhoneRedesign };
};

export default HomeSections;
