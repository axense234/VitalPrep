// Types
import HomeCardProps from "@/core/interfaces/HomeCardProps";
// SCSS
import homeCardsStyles from "../../../../scss/components/page/HomeCards.module.scss";
// React
import { FC } from "react";
// Components
import PrimaryButton from "../../../shared/PrimaryButton";
// Next
import Link from "next/link";
// Data
import { homeCardsContent } from "@/data";

const HomeCards = () => {
  return (
    <ul className={homeCardsStyles.homeCardsContainer}>
      {homeCardsContent.map((homeCardContent) => {
        return (
          <HomeCard {...homeCardContent} key={homeCardContent.id as number} />
        );
      })}
    </ul>
  );
};

const HomeCard: FC<HomeCardProps> = ({
  information,
  title,
  type,
  withLinksCardReferenceId,
  backgroundColor,
}) => {
  if (type === "generic") {
    return (
      <section
        className={homeCardsStyles.homeCardContainer}
        style={{ backgroundColor }}
      >
        <h1>{title}</h1>
        <p>{information}</p>
      </section>
    );
  }

  if (type === "introduction") {
    return (
      <section
        className={homeCardsStyles.homeCardContainer}
        style={{ backgroundColor }}
      >
        <h1>{title}</h1>
        <p>{information}</p>
        <PrimaryButton
          backgroundColor="#42171C"
          fontSize={21}
          width={216}
          content="Get Started"
          fontFamily="Cabin"
          height={48}
          type="link"
          linkDest="/create-tool"
          disabled={false}
        />
      </section>
    );
  }

  if (type === "withLinks") {
    switch (withLinksCardReferenceId) {
      case 1:
        return (
          <section
            className={homeCardsStyles.homeCardContainer}
            style={{ backgroundColor }}
          >
            <h1>{title}</h1>
            <p>
              Meal Prep difficulty varies based on complexity, dietary needs and
              kitchen skills. If you have never done a meal prep before please
              checkout the <Link href="/guide">Getting Started Page</Link>.
              <br />
              <br /> If you want to get started right away you can do so by
              adding a few Ingredients then creating a Recipe using the{" "}
              <Link href="/create-tool">Create Tool Page</Link>.
            </p>
          </section>
        );
      default:
        throw new Error("Invalid withLinksCardReferenceId!");
    }
  }

  return null;
};

export default HomeCards;
