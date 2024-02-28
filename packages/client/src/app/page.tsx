// SCSS
import homeStyles from "../scss/pages/Home.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import HomeCard from "@/components/page/HomeCard";

const Home = () => {
  return (
    <div className={homeStyles.homeContainer}>
      <PageTitle titleContent="Vital Prep" subtitleContent="meal prep helper" />
      <HomeCard
        title="What is Vital Prep?"
        information="VitalPrep is a complex meal prep helper app that helps people create meal prep plans and to follow those respective plans."
        type="introduction"
      />
    </div>
  );
};

export default Home;
