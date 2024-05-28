// SCSS
import gettingStartedContentStyles from "@/scss/pages/GettingStarted.module.scss";
// Next
import Image from "next/image";
// Translations
import { useTranslations } from "next-intl";
// Helpers
import translateWithRichText from "@/helpers/translateWithRichText";

const GettingStartedContentSessionLogs = () => {
  const translateLogs = useTranslations("gettingStarted.content.logs");
  return (
    <section
      className={gettingStartedContentStyles.gettingStartedContentSection}
    >
      <h4>{translateLogs("title")}</h4>
      <div
        className={gettingStartedContentStyles.gettingStartedContentArticles}
      >
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateLogs("articles.1.title")}</h5>
          <p>
            {translateWithRichText(translateLogs, "articles.1.descriptions.1")}
          </p>
          <Image
            width={720}
            height={480}
            src={translateLogs("articles.1.images.1")}
            alt={translateLogs("articles.1.imageAlt")}
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateLogs("articles.2.title")}</h5>
          <p>
            {translateWithRichText(translateLogs, "articles.2.descriptions.1")}
          </p>
          <Image
            width={720}
            height={480}
            src={translateLogs("articles.2.images.1")}
            alt={translateLogs("articles.2.imageAlt")}
          />
          <p>
            {translateWithRichText(translateLogs, "articles.2.descriptions.2")}
          </p>
          <Image
            width={720}
            height={480}
            src={translateLogs("articles.2.images.2")}
            alt={translateLogs("articles.2.imageAlt")}
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>{translateLogs("articles.3.title")}</h5>
          <p>
            {translateWithRichText(translateLogs, "articles.3.descriptions.1")}
          </p>
          <Image
            width={720}
            height={480}
            src={translateLogs("articles.3.images.1")}
            alt={translateLogs("articles.3.imageAlt")}
          />
          <Image
            width={720}
            height={480}
            src={translateLogs("articles.3.images.2")}
            alt={translateLogs("articles.3.imageAlt")}
          />
        </article>
      </div>
    </section>
  );
};

export default GettingStartedContentSessionLogs;
