// Types
import HomeSectionContentProps from "@/core/interfaces/HomeSectionContentProps";
// SCSS
import homeSectionsStyles from "@/scss/pages/Home.module.scss";
// React
import { FC } from "react";
// Next
import Image from "next/image";
// Translations
import { useTranslations } from "next-intl";
// Hooks
import usePopInAnimation from "@/hooks/usePopInTransition";
// Pop-in Transitions
import { useInView } from "react-intersection-observer";
// Helpers
import selectRefBasedOnNumber from "@/helpers/selectRefBasedOnNumber";

const HomeSectionItemsBased: FC<HomeSectionContentProps> = ({
  sectionItems,
  tabletAndPhoneRedesign,
  id,
}) => {
  const translate = useTranslations(`home.sections.section-${id}`);

  const [firstItemRef, secondItemRef, thirdItemRef] = useGetTransitionRefs();

  return (
    <section
      className={homeSectionsStyles.homeSectionContainer}
      style={{ minHeight: "55rem", height: "auto" }}
    >
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
          <ul className={homeSectionsStyles.homeSectionContentItems}>
            {sectionItems?.map((sectionItem, index) => {
              const selectedRef = selectRefBasedOnNumber(
                [firstItemRef, secondItemRef, thirdItemRef],
                index
              );
              return (
                <li
                  key={sectionItem.id}
                  className={`${homeSectionsStyles.homeSectionContentItem} hiddenLTR`}
                  ref={selectedRef}
                >
                  <Image
                    alt={translate(`items.item-${sectionItem.id}.itemTitle`)}
                    src={sectionItem.imageSrc}
                    width={tabletAndPhoneRedesign ? 100 : 128}
                    height={tabletAndPhoneRedesign ? 100 : 128}
                  />
                  <div
                    className={homeSectionsStyles.homeSectionContentItemHeader}
                  >
                    <h4>
                      {translate(`items.item-${sectionItem.id}.itemTitle`)}
                    </h4>
                    <p>
                      {translate(
                        `items.item-${sectionItem.id}.itemDescription`
                      )}
                    </p>
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

const useGetTransitionRefs = () => {
  const {
    ref: firstItemRef,
    inView: firstItemInView,
    entry: firstItemEntry,
  } = useInView();
  const {
    ref: secondItemRef,
    inView: secondItemInView,
    entry: secondItemEntry,
  } = useInView();
  const {
    ref: thirdItemRef,
    inView: thirdItemInView,
    entry: thirdItemEntry,
  } = useInView();
  usePopInAnimation("showLTR", firstItemInView, firstItemEntry);
  usePopInAnimation("showLTR", secondItemInView, secondItemEntry);
  usePopInAnimation("showLTR", thirdItemInView, thirdItemEntry);
  return [firstItemRef, secondItemRef, thirdItemRef];
};

export default HomeSectionItemsBased;
