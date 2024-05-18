// SCSS
import aboutStyles from "@/scss/pages/About.module.scss";
// Data
import {
  aboutFrontendTechnologies,
  aboutBackendTechnologies,
  aboutCloudServices,
  aboutMediaManagement,
  aboutVCS,
} from "@/data";
// Next
import Image from "next/image";
// Translations
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const AboutContent = () => {
  const translateAbout = useTranslations("about.sections");
  return (
    <div className={aboutStyles.aboutContent}>
      <section className={aboutStyles.aboutContentSection}>
        <h1>{translateAbout("1.sectionTitle")}</h1>
        <p>{translateAbout("1.descriptions.1")}</p>
        <p>{translateAbout("1.descriptions.2")}</p>
      </section>
      <section className={aboutStyles.aboutContentSection}>
        <h1>{translateAbout("2.sectionTitle")}</h1>
        <p>{translateAbout("2.sectionDescription")}</p>
        <ul className={aboutStyles.aboutContentSectionLogos}>
          {aboutFrontendTechnologies.map((frontendTech) => {
            return (
              <li key={frontendTech.id}>
                <Link
                  href={frontendTech.logoDest as any}
                  title={frontendTech.logoLabel}
                  aria-label={frontendTech.logoLabel}
                >
                  <Image
                    width={160}
                    height={160}
                    alt={frontendTech.logoLabel}
                    src={frontendTech.logoUrl}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={aboutStyles.aboutContentSection}>
        <h1>{translateAbout("3.sectionTitle")}</h1>
        <p>{translateAbout("3.sectionDescription")}</p>
        <ul className={aboutStyles.aboutContentSectionLogos}>
          {aboutBackendTechnologies.map((backendTech) => {
            return (
              <li key={backendTech.id}>
                <Link
                  href={backendTech.logoDest as any}
                  title={backendTech.logoLabel}
                  aria-label={backendTech.logoLabel}
                >
                  <Image
                    width={120}
                    height={120}
                    alt={backendTech.logoLabel}
                    src={backendTech.logoUrl}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={aboutStyles.aboutContentSection}>
        <h1>{translateAbout("4.sectionTitle")}</h1>
        <p>{translateAbout("4.sectionDescription")}</p>
        <ul className={aboutStyles.aboutContentSectionLogos}>
          {aboutCloudServices.map((cloudService) => {
            return (
              <li key={cloudService.id}>
                <Link
                  href={cloudService.logoDest as any}
                  title={cloudService.logoLabel}
                  aria-label={cloudService.logoLabel}
                >
                  <Image
                    width={160}
                    height={160}
                    alt={cloudService.logoLabel}
                    src={cloudService.logoUrl}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={aboutStyles.aboutContentSection}>
        <h1>{translateAbout("5.sectionTitle")}</h1>
        <p>{translateAbout("5.sectionDescription")}</p>
        <h4>{translateAbout("5.sectionSubTitles.1")}</h4>
        <ul
          className={aboutStyles.aboutContentSectionLogos}
          style={{
            justifyContent: "flex-start",
            alignSelf: "flex-start",
            marginTop: "0rem",
            padding: "0rem",
          }}
        >
          {aboutMediaManagement.map((mediaManagement) => {
            return (
              <li key={mediaManagement.id}>
                <Link
                  href={mediaManagement.logoDest as any}
                  title={mediaManagement.logoLabel}
                  aria-label={mediaManagement.logoLabel}
                >
                  <Image
                    width={160}
                    height={160}
                    alt={mediaManagement.logoLabel}
                    src={mediaManagement.logoUrl}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
        <h4>{translateAbout("5.sectionSubTitles.2")}</h4>
        <ul
          className={aboutStyles.aboutContentSectionLogos}
          style={{
            justifyContent: "flex-start",
            alignSelf: "flex-start",
            padding: "0rem",
            marginTop: "0rem",
          }}
        >
          {aboutVCS.map((vcs) => {
            return (
              <li key={vcs.id}>
                <Link
                  href={vcs.logoDest as any}
                  title={vcs.logoLabel}
                  aria-label={vcs.logoLabel}
                >
                  <Image
                    width={160}
                    height={160}
                    alt={vcs.logoLabel}
                    src={vcs.logoUrl}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default AboutContent;
