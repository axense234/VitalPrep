// SCSS
import gettingStartedContentStyles from "../../../../scss/pages/GettingStarted.module.scss";
// Next
import Image from "next/image";
import Link from "next/link";

const GettingStartedContentEntities = () => {
  return (
    <section
      className={gettingStartedContentStyles.gettingStartedContentSection}
    >
      <h4>Entities</h4>
      <div
        className={gettingStartedContentStyles.gettingStartedContentArticles}
      >
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Ingredients</h5>
          <p>
            <span>Ingredients</span> are the main components of a{" "}
            <span>Recipe</span>. Without them, you cannot create Recipes, and
            without Recipes you cannot create Day Plans and so on. They
            represent the ingredients used in the recipe.
          </p>
          <p>
            Use the <Link href="/create-tool"> Create Tool Page</Link> to create
            an <span>Ingredient</span>. Give it an appropriate name,
            image(optional) and specify if it is enabled or not. Don’t forget to
            also add <span>macros</span>.
          </p>
          <p>
            <span>NOTE:</span>: Adding macros is optional, especially for
            condiments, but in general it is a good idea to accurately add
            macros to your ingredients when creating them.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715181329/VitalPrep/Screenshot_38_tdcdyr.png"
            alt="Create Ingredient Image"
          />
          <p>
            To <span>view</span> all your <span>created entities</span>, use the
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>. To view
            an <span>individual entity</span> in detail, click any{" "}
            <span>Ingredient</span>
            component on the{" "}
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715181484/VitalPrep/Screenshot_39_moj2tx.png"
            alt="Access Ingredient Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Utensils</h5>
          <p>
            <span>Utensils</span> are components of a <span>Recipe</span>.
            Without them, you cannot create Recipes, and without Recipes you
            cannot create Day Plans and so on. They represent the kitchen
            utensils/tools that are used in the recipe.
          </p>
          <p>
            Use the <Link href="/create-tool"> Create Tool Page</Link> to create
            an <span>Utensil</span>. Give it an appropriate name,
            image(optional) and specify if it is enabled or not.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715181630/VitalPrep/Screenshot_40_rvtkbe.png"
            alt="Create Utensil Image"
          />
          <p>
            To <span>view</span> all your <span>created entities</span>, use the
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>. To view
            an <span>individual entity</span> in detail, click any{" "}
            <span>Utensil</span>
            component on the{" "}
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715181718/VitalPrep/Screenshot_41_sl4fdr.png"
            alt="Access Utensil Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Recipes</h5>
          <p>
            <span>Recipes</span> are the main components of a{" "}
            <span>Day Plan</span>. Without them, you cannot create{" "}
            <span>Day Plans</span>, and without Day Plans you cannot create
            <span>Session Templates</span> and so on. They represent the actual
            recipes used by meals in a <span>Day Plan</span>.
          </p>
          <p>
            Use the <Link href="/create-tool"> Create Tool Page</Link> to create
            a <span>Recipe</span>. Give it an appropriate name, image(optional)
            and either a <span>Video Tutorial</span>,{" "}
            <span>Written Tutorial</span> or both.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715181911/VitalPrep/Screenshot_42_gw8stk.png"
            alt="Create Recipe Image Part 1"
          />
          <p>
            After that, select all the <span>Ingredients</span> and{" "}
            <span>Utensils</span> the <span>Recipe</span> uses.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715182012/VitalPrep/Screenshot_43_ijmjfh.png"
            alt="Create Recipe Image Part 2"
          />
          <p>
            To <span>view</span> all your <span>created entities</span>, use the
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>. To view
            an <span>individual entity</span> in detail, click any{" "}
            <span>Recipe</span>
            component on the{" "}
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715182089/VitalPrep/Screenshot_45_erigz6.png"
            alt="Access Recipe Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Day Plans</h5>
          <p>
            <span>Day Plans</span> are the main components of a{" "}
            <span>Session Template</span>. Without them, you cannot create
            <span>Session Templates</span>, and without{" "}
            <span>Session Templates</span> you cannot create{" "}
            <span>Meal Prep Plans</span>. They each represent the plan for a
            specific day in a <span>Session Template</span>.
          </p>
          <p>
            Use the <Link href="/create-tool"> Create Tool Page</Link> to create
            a <span>Day Plan</span>. Give it an appropriate name,
            image(optional) and the number of meals the day plan will have.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715183076/VitalPrep/Screenshot_46_qw9rgz.png"
            alt="Create Day Plan Image Part 1"
          />
          <p>
            After that, select a <span>specific Recipe</span> for each meal
            used.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715183623/VitalPrep/Screenshot_47_qzv7b4.png"
            alt="Create Day Plan Image Part 2"
          />
          <p>
            To <span>view</span> all your <span>created entities</span>, use the
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>. To view
            an <span>individual entity</span> in detail, click any{" "}
            <span>Day Plan</span>
            component on the{" "}
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715183690/VitalPrep/Screenshot_48_mompqr.png"
            alt="Access Day Plan Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Session Templates</h5>
          <p>
            <span>Session Templates</span> are the main components of a{" "}
            <span>Meal Prep Plan</span>. Without them, you cannot create{" "}
            <span>Meal Prep Plans</span>. They each represent the specific
            template/scheme for a specific session in a{" "}
            <span>Meal Prep Plan</span>.
          </p>
          <p>
            <span>Session Templates</span> are also used by{" "}
            <span>Session Logs</span>.
          </p>
          <p>
            Use the <Link href="/create-tool"> Create Tool Page</Link> to create
            a <span>Session Template</span>. Give it an appropriate name,
            image(optional) and the number of days it will cover.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715183829/VitalPrep/Screenshot_49_cnpacm.png"
            alt="Create Session Template Image Part 1"
          />
          <p>
            After that, select a <span>specific Day Plan</span> for each
            specific day covered.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715183890/VitalPrep/Screenshot_50_p8l6wt.png"
            alt="Create Session Template Image Part 2"
          />
          <p>
            To <span>view</span> all your <span>created entities</span>, use the
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>. To view
            an <span>individual entity</span> in detail, click any{" "}
            <span>Session Template</span>
            component on the{" "}
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715184001/VitalPrep/Screenshot_52_ctxjaz.png"
            alt="Access Session Template Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Meal Prep Plans</h5>
          <p>
            <span>Meal Prep Plans</span> represent the actual plans you will
            follow. In order to receive reminder type <span>notifications</span>{" "}
            for your <span>Meal Prep Plan Sessions</span>, you will need to
            <span>activate</span> said Meal Prep Plan and also{" "}
            <span>subscribe to our notifications</span>.
          </p>
          <p>
            Use the <Link href="/create-tool"> Create Tool Page</Link> to create
            a <span>Session Template</span>. Give it an appropriate name,
            image(optional) and the number of sessions it will have.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715184134/VitalPrep/Screenshot_53_bgbocc.png"
            alt="Create Meal Prep Plan Image Part 1"
          />
          <p>
            After that, select a <span>specific Session Template</span> for each
            specific session, the <span>weekday</span> and <span>hour</span> you
            will start meal prepping.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715184377/VitalPrep/Screenshot_54_qsapvp.png"
            alt="Create Session Template Image Part 2"
          />
          <p>
            To <span>view</span> all your <span>created entities</span>, use the
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>. To view
            an <span>individual entity</span> in detail, click any{" "}
            <span>Meal Prep Plan</span>
            component on the{" "}
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715184475/VitalPrep/Screenshot_55_ukdzrs.png"
            alt="Access Meal Prep Plan Image"
          />
        </article>
      </div>
    </section>
  );
};

export default GettingStartedContentEntities;
