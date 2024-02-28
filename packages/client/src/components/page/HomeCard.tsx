// Types
import HomeCardProps from "@/core/interfaces/HomeCardProps";
// SCSS
import homeCardStyles from "../../scss/components/page/HomeCard.module.scss";
// React
import { FC } from "react";
import PrimaryButton from "../shared/PrimaryButton";

const HomeCard: FC<HomeCardProps> = ({ information, title, type }) => {
  if (type === "generic") {
    return (
      <section className={homeCardStyles.homeCardContainer}>
        <h1>{title}</h1>
        <p>{information}</p>
      </section>
    );
  }

  if (type === "introduction") {
    return (
      <section className={homeCardStyles.homeCardContainer}>
        <h1>{title}</h1>
        <p>{information}</p>
        <PrimaryButton
          backgroundColor="#42171C"
          content="Get Started"
          fontFamily="Cabin"
          height={48}
          type="link"
          linkDest="/create-tool"
        />
      </section>
    );
  }

  return null;
};

export default HomeCard;
