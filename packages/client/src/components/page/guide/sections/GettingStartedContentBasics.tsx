// SCSS
import gettingStartedContentStyles from "@/scss/pages/GettingStarted.module.scss";
// Next
import Image from "next/image";
// Translations
import { useTranslations } from "next-intl";
// Helpers
import translateWithRichText from "@/helpers/translateWithRichText";

const GettingStartedContentBasics = () => {
  const translateBasics = useTranslations("gettingStarted.content.basics");
  return (
    <section
      className={gettingStartedContentStyles.gettingStartedContentSection}
    >
      <h4>{translateBasics("title")}</h4>
      <div
        className={gettingStartedContentStyles.gettingStartedContentArticles}
      >
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateBasics("articles.1.title")}</h5>
          <p>
            {translateWithRichText(
              translateBasics,
              "articles.1.descriptions.1"
            )}
          </p>
          <p>
            {translateWithRichText(
              translateBasics,
              "articles.1.descriptions.2"
            )}
          </p>
          <Image
            width={720}
            height={480}
            src={translateBasics("articles.1.images.1")}
            alt={translateBasics("articles.1.imageAlt")}
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateBasics("articles.2.title")}</h5>
          <p>
            {translateWithRichText(
              translateBasics,
              "articles.2.descriptions.1"
            )}
          </p>
          <p>
            {translateWithRichText(
              translateBasics,
              "articles.2.descriptions.2"
            )}
          </p>
          <Image
            width={720}
            height={480}
            src={translateBasics("articles.2.images.1")}
            alt={translateBasics("articles.2.imageAlt")}
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateBasics("articles.3.title")}</h5>
          <p>
            {translateWithRichText(
              translateBasics,
              "articles.3.descriptions.1"
            )}
          </p>
          <p>
            {translateWithRichText(
              translateBasics,
              "articles.3.descriptions.2"
            )}
          </p>
          <Image
            width={720}
            height={480}
            src={translateBasics("articles.3.images.1")}
            alt={translateBasics("articles.3.imageAlt")}
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateBasics("articles.4.title")}</h5>
          <p>
            {translateWithRichText(
              translateBasics,
              "articles.4.descriptions.1"
            )}
          </p>
          <p>
            {translateWithRichText(
              translateBasics,
              "articles.4.descriptions.2"
            )}
          </p>
          <p>
            {translateWithRichText(
              translateBasics,
              "articles.4.descriptions.3"
            )}
          </p>
          <Image
            width={720}
            height={480}
            src={translateBasics("articles.4.images.1")}
            alt={translateBasics("articles.4.imageAlt")}
          />
          <Image
            width={720}
            height={480}
            src={translateBasics("articles.4.images.2")}
            alt={translateBasics("articles.4.imageAlt")}
          />
        </article>
      </div>
    </section>
  );
};

export default GettingStartedContentBasics;
