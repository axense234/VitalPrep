// SCSS
import gettingStartedContentStyles from "@/scss/pages/GettingStarted.module.scss";
// Next
import Image from "next/image";
// Translations
import { useTranslations } from "next-intl";
// Helpers
import translateWithRichText from "@/helpers/translateWithRichText";
// React
import { FC } from "react";
// Types
import GettingStartedContentSectionProps from "@/core/interfaces/GettingStartedContentSectionProps";

const GettingStartedContentExtras: FC<GettingStartedContentSectionProps> = ({
  currentGuideSectionRef,
}) => {
  const translateExtras = useTranslations("gettingStarted.content.extras");
  return (
    <section
      className={gettingStartedContentStyles.gettingStartedContentSection}
      ref={currentGuideSectionRef}
    >
      <h4>{translateExtras("title")}</h4>
      <div
        className={gettingStartedContentStyles.gettingStartedContentArticles}
      >
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateExtras("articles.1.title")}</h5>
          <p>
            {translateWithRichText(
              translateExtras,
              "articles.1.descriptions.1"
            )}
          </p>
          <Image
            width={720}
            height={480}
            src={translateExtras("articles.1.images.1")}
            alt={translateExtras("articles.1.imageAlt")}
          />
          <Image
            width={720}
            height={480}
            src={translateExtras("articles.1.images.2")}
            alt={translateExtras("articles.1.imageAlt")}
          />
          <p>
            {translateWithRichText(
              translateExtras,
              "articles.1.descriptions.2"
            )}
          </p>
          <Image
            width={720}
            height={480}
            src={translateExtras("articles.1.images.3")}
            alt={translateExtras("articles.1.imageAlt")}
          />
          <Image
            width={720}
            height={480}
            src={translateExtras("articles.1.images.4")}
            alt={translateExtras("articles.1.imageAlt")}
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateExtras("articles.2.title")}</h5>
          <p>
            {translateWithRichText(
              translateExtras,
              "articles.2.descriptions.1"
            )}
          </p>
          <p>
            {translateWithRichText(
              translateExtras,
              "articles.2.descriptions.2"
            )}
          </p>
          <Image
            width={720}
            height={480}
            src={translateExtras("articles.2.images.1")}
            alt={translateExtras("articles.2.imageAlt")}
          />
          <Image
            width={720}
            height={480}
            src={translateExtras("articles.2.images.2")}
            alt={translateExtras("articles.2.imageAlt")}
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateExtras("articles.3.title")}</h5>
          <p>
            {translateWithRichText(
              translateExtras,
              "articles.3.descriptions.1"
            )}
          </p>
          <Image
            width={720}
            height={480}
            src={translateExtras("articles.3.images.1")}
            alt={translateExtras("articles.3.imageAlt")}
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateExtras("articles.4.title")}</h5>
          <p>
            {translateWithRichText(
              translateExtras,
              "articles.4.descriptions.1"
            )}
          </p>
          <p>
            {translateWithRichText(
              translateExtras,
              "articles.4.descriptions.2"
            )}
          </p>
          <Image
            width={720}
            height={480}
            src={translateExtras("articles.4.images.1")}
            alt={translateExtras("articles.4.imageAlt")}
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateExtras("articles.5.title")}</h5>
          <p>
            {translateWithRichText(
              translateExtras,
              "articles.5.descriptions.1"
            )}
          </p>
          <Image
            width={720}
            height={480}
            src={translateExtras("articles.5.images.1")}
            alt={translateExtras("articles.5.imageAlt")}
          />
        </article>
      </div>
    </section>
  );
};

export default GettingStartedContentExtras;
