"use client";
// SCSS
import aboutStyles from "@/scss/pages/About.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import AboutContent from "@/components/page/about/AboutContent";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const About = () => {
  useAuthorization();

  return (
    <div className={aboutStyles.aboutContainer}>
      <PageTitle />
      <AboutContent />
    </div>
  );
};

export default About;
