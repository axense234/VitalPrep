"use client";
// SCSS
import homeStyles from "../../../scss/pages/Home.module.scss";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Components
import HomeSections from "@/components/page/create-tool/home/HomeSections";

const Home = () => {
  useAuthorization();

  return (
    <div className={homeStyles.homeContainer}>
      <HomeSections />
    </div>
  );
};

export default Home;
