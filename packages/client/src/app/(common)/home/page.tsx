// SCSS
import homeStyles from "../../../scss/pages/Home.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import HomeCards from "@/components/page/HomeCards";

const Home = () => {
  return (
    <div className={homeStyles.homeContainer}>
      <PageTitle titleContent="Vital Prep" subtitleContent="meal prep helper" />
      <HomeCards />
    </div>
  );
};

export default Home;
