// SCSS
import aboutStyles from "../../../scss/pages/About.module.scss";
// Data
import {
  aboutFrontendTechnologies,
  aboutBackendTechnologies,
  aboutCloudServices,
  aboutMediaManagement,
  aboutVCS,
} from "@/data";
// Next
import Link from "next/link";
import Image from "next/image";

const AboutContent = () => {
  return (
    <div className={aboutStyles.aboutContent}>
      <section className={aboutStyles.aboutContentSection}>
        <h1>Intro</h1>
        <p>
          This app is all about creating a way for a user to be able to meal
          prep in a dynamic way, using their own ingredients, recipes, etc...
        </p>
        <p>
          When i created this app i wanted to create an app for myself that logs
          my meal preps and allows me to create more recipes for my future meal
          preps. Also i wanted to create this app just for fun.
        </p>
      </section>
      <section className={aboutStyles.aboutContentSection}>
        <h1>Frontend Technologies</h1>
        <p>
          The following are the technologies i have used on the frontend to
          create this app:
        </p>
        <ul className={aboutStyles.aboutContentSectionLogos}>
          {aboutFrontendTechnologies.map((frontendTech) => {
            return (
              <li key={frontendTech.id}>
                <Link
                  href={frontendTech.logoDest}
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
        <h1>Backend Technologies</h1>
        <p>
          The following are the technologies i have used on the backend to
          create this app:
        </p>
        <ul className={aboutStyles.aboutContentSectionLogos}>
          {aboutBackendTechnologies.map((backendTech) => {
            return (
              <li key={backendTech.id}>
                <Link
                  href={backendTech.logoDest}
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
        <h1>Cloud Services</h1>
        <p>
          The following are the cloud services i have used in order to host the
          frontend, backend and the databases:
        </p>
        <ul className={aboutStyles.aboutContentSectionLogos}>
          {aboutCloudServices.map((cloudService) => {
            return (
              <li key={cloudService.id}>
                <Link
                  href={cloudService.logoDest}
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
        <h1>Others</h1>
        <p>
          The following are other technologies i have used but not included in
          the above:
        </p>
        <h4>Media Management</h4>
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
                  href={mediaManagement.logoDest}
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
        <h4>Version Control System(VCS)</h4>
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
                  href={vcs.logoDest}
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
