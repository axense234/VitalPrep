// SCSS
import homeStyles from "../scss/pages/Home.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import HomeCard from "@/components/page/HomeCard";
// Data
import { homeCardsContent } from "@/data";

const Home = () => {
  return (
    <div className={homeStyles.homeContainer}>
      <PageTitle titleContent="Vital Prep" subtitleContent="meal prep helper" />
      <HomeCards />
    </div>
  );
};

const HomeCards = () => {
  return (
    <ul className={homeStyles.homeCardsContainer}>
      {homeCardsContent.map((homeCardContent) => {
        return (
          <HomeCard {...homeCardContent} key={homeCardContent.id as number} />
        );
      })}
    </ul>
  );
};

export default Home;
