"use client";

// SCSS
import gettingStartedStyles from "../../../scss/pages/GettingStarted.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Next
import Link from "next/link";

const GettingStarted = () => {
  useAuthorization();

  return (
    <div className={gettingStartedStyles.gettingStartedContainer}>
      <PageTitle
        titleContent="Getting Started"
        subtitleContent="a simple guide to meal prepping"
      />
      <GettingStartedContent />
    </div>
  );
};

const GettingStartedContent = () => {
  return (
    <div className={gettingStartedStyles.gettingStartedContent}>
      <section className={gettingStartedStyles.gettingStartedSection}>
        <h1>The Basics</h1>
        <p>
          <span>NOTE:</span> The following tutorial requires prior knowledge of
          meal prepping. If you do not know anything about meal prepping, try
          reading a bit online or checkout the <Link href="/faq">FAQ page</Link>
          .
        </p>
        <p>
          This guide’s <span>goal</span> is to teach you how to create a{" "}
          <span>Meal Prep Plan</span> in order to use it in a practical way.
        </p>
        <p>
          First things first, you want to add a few Ingredients and Utensils
          using the <Link href="/create-tool">Create Tool Page</Link>.
        </p>
        <p>
          To create an <span>Ingredient</span>, give it an appropriate name,
          image(optional), specify if it enabled or not, and the macros for your
          chosen unit(grams, cups, teaspoons). Note that the adding of macros is
          optional, especially for condiments, but in general it is a good idea
          to accurately add macros to your ingredients when creating them.
        </p>
        <p>
          To create an <span>Utensil</span>, give it an appropriate name,
          image(optional) and specify if it is enabled or not.
        </p>
        <p>
          <span>NOTE:</span>: If an <span>Utensil</span> or an{" "}
          <span>Utensil</span> is enabled it means that it can be used in the{" "}
          <span>Recipes</span> that need it, otherwise those Recipes will not be
          enabled, thus also making the <span>Meal Prep Plan</span> with the
          said Recipes disabled.
        </p>
        <p>
          If you are having trouble or are getting stuck, please check the
          following video:
        </p>
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/ulhRORJpuBM?si=5bKBqwbU9JrwvQ3z"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <p>
          In order to <span>test</span> that you have created the respective
          Ingredients and Utensils, use the{" "}
          <Link href="/multi-view-tool">Multi-View Tool Page</Link> and select
          Ingredients, where the created Ingredients should appear, then select
          Utensils to see if any of your created Utensils appear.
        </p>
      </section>
      <section className={gettingStartedStyles.gettingStartedSection}>
        <h1>Creating Recipes</h1>
        <p>
          Now that you have some <span>Ingredients</span> and{" "}
          <span>Utensils</span> added, you can start creating some{" "}
          <span>Recipes</span>. Again, for this task you will use the{" "}
          <Link href="/create-tool">Create Tool Page</Link>.
        </p>
        <p>
          To create a <span>Recipe</span>, choose an appropriate Recipe name,
          image(optional), select the <span>Ingredients</span> you want your
          Recipe to contain and their individual quantity. Next select the{" "}
          <span>Utensils</span> your recipe will use. After everything is
          completed, add your own Video Tutorial or Written Tutorial. Note that
          this step is completely optional.
        </p>
        <p>
          If you are having trouble or are getting stuck, please check the
          following video:
        </p>
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/ulhRORJpuBM?si=5bKBqwbU9JrwvQ3z"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <p>
          In order to <span>test</span> that your <span>Recipes</span> have been
          created successfully, use the{" "}
          <Link href="/multi-view-tool">Multi-View Tool Page</Link> and select
          Recipes. There should be matching Recipes with the same name as your
          created ones.
        </p>
      </section>
      <section className={gettingStartedStyles.gettingStartedSection}>
        <h1>Creating Templates</h1>
        <p>
          With your created Recipes you can now create{" "}
          <span>Day Templates</span> and <span>Instance Templates</span>. Each
          one of them will be explained in detail down below:
        </p>
        <h2>Day Templates</h2>
        <p>
          A <span>Day Template</span> represents the set of meals you will
          prepare for a specific day in an Instance Template. For example, let’s
          say you want to meal prep for 3 days, each day having different set of
          meals. In this case, you would want to use 3 different Day Templates,
          each representing the set of meals used every day.
        </p>
        <p>
          Another example would be meal prepping for 3 days, but on the first
          and second day you want to prepare the same set of meals, but on the
          third day you want a different set of meals. In this scenario, you
          would need only 2 Day Templates: 1 for the first and second day and 1
          for the third day.
        </p>
        <p>
          To <span>create</span> a <span>Day Template</span>, you will have to
          use the <Link href="/create-tool">Create Tool Page</Link>. Choose an
          appropriate name, image(optional), the number of Meals you will
          prepare for a specific day with the Recipes that will be used for each
          respective meal.
        </p>
        <p>
          If you are having trouble or are getting stuck, please check the
          following video:
        </p>
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/ulhRORJpuBM?si=5bKBqwbU9JrwvQ3z"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <p>
          In order to <span>test</span> that your <span>Day Templates</span>{" "}
          have been created successfully, use the{" "}
          <Link href="/multi-view-tool">Multi-View Tool Page</Link> and select
          Day Templates. There should be matching Day Templates with the same
          name as your created ones.
        </p>
        <h2>Instance Templates</h2>
        <p>
          An <span>Instance Template</span> represents the instance of a meal
          prep, or the meal prep itself. An Instance Template is composed of
          multiple Day Templates, based on the number of days you will prepare
          meals for.
        </p>
        <p>
          For example, let’s say you wanted to meal prep for 3 days, using 2 Day
          Templates. An Instance Template would represent this whole instance,
          basically a collection of day templates based on the number of days
          you want to meal prep for, in this case 3 days.
        </p>
        <p>
          To <span>create</span> an <span>Instance Template</span>, you will
          have to use the <Link href="/create-tool">Create Tool Page</Link>.
          Choose an appropriate name, image(optional), the number of days you
          will meal prep for . Next choose the Day Templates for each day
          covered.
        </p>
        <p>
          <span>NOTE:</span> Let’s say you wanted to meal prep for 4 days, but
          wanted the following days covered: Tuesday, Wednesday, Friday and
          Saturday. In this scenario, your number of days would be 5.
        </p>
        <p>
          In this specific scenario where you only want to meal prep for 4 days
          but have 5 days covered, for the day that you do not want meals
          prepared for you can simply choose no Day Instance for this respective
          day when creating the Instance Template.
        </p>
        <p>
          If you are having trouble or are getting stuck, please check the
          following video:
        </p>
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/ulhRORJpuBM?si=5bKBqwbU9JrwvQ3z"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <p>
          In order to <span>test</span> that your{" "}
          <span>Instance Templates</span> have been created successfully, use
          the <Link href="/multi-view-tool">Multi-View Tool Page</Link> and
          select Instance Templates. There should be matching Instance Templates
          with the same name as your created ones.
        </p>
      </section>
      <section className={gettingStartedStyles.gettingStartedSection}>
        <h1>Creating Meal Prep Plans</h1>
        <p>
          Now that you have some Instance Templates created, you can start
          creating <span>Meal Prep Plans</span>.
        </p>
        <p>
          A <span>Meal Prep Plan</span> is a collection of Instance Templates
          that are used on a weekly basis.
        </p>
        <p>
          For example, let’s say you wanted to meal prep 2 times a week, first
          meal prep covering Monday-Thursday and the second meal prep covering
          Friday-Sunday. Each one of those instances represent an Instance
          Template, thus a <span>Meal Prep Plan</span> represents the collection
          of those respective Instance Templates, on a weekly basis.
        </p>
        <p>
          To <span>create</span> a <span>Meal Prep Plan</span>, you will have to
          use the <Link href="/create-tool">Create Tool Page</Link> once again.
          Choose an appropriate name, image(optional), the number of instances
          your meal prep plan will have and their respective Instance Templates.
        </p>
        <p>
          Next choose the Meal Prep Day for each of the chosen Instance
          Templates. This meal prep day represents the day of the week and time
          you will start your <span>Meal Prep Session</span>.
        </p>
        <p>
          If you are having trouble or are getting stuck, please check the
          following video:
        </p>
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/ulhRORJpuBM?si=5bKBqwbU9JrwvQ3z"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <p>
          <span>NOTE: </span>You want this starting day to be 1 day before your
          first day of your meal prep instance coverage. If you wanted to meal
          prep 2 days in advance(meaning that, let’s say you wanted to meal prep
          on Monday but will only prepare meals for Thursday, Friday and
          Saturday, you would create an Instance Template that has Tuesday and
          Wednesday as days with no Instance Templates.
        </p>
        <p>
          <span>NOTE: </span> If you have more than 2 instances in your meal
          prep, chances are that some days might overlap, meaning that you have
          meals prepared for that overlapped day from multiple instances. In
          some cases, you might want this, in other cases, you do not want this.
        </p>
        <p>
          In order to <span>test</span> that your <span>Meal Prep Plans</span>{" "}
          have been created successfully, use the{" "}
          <Link href="/multi-view-tool">Multi-View Tool Page</Link> and select
          Meal Prep Plans. There should be matching Meal Prep Plans with the
          same name as your created ones.
        </p>
        <p>
          Now that you have a <span>Meal Prep Plan</span> created, in order to
          receive reminder notifications you will have to activate the
          respective Meal Prep Plan. If you only have 1 Meal Prep Plan, it will
          automatically be activated. You can change this behavior in the
          settings. Also, if you want to deactivate/activate a Meal Prep Plan,
          you can do so from the tooltip that shows up when you hover/hold over
          it.
        </p>
        <p>
          <span>NOTE: </span>If you have no activated Meal Prep Plans you will
          not receive any reminder type <span>Notifications</span>.
        </p>
      </section>
      <section className={gettingStartedStyles.gettingStartedSection}>
        <h1>Practical Use of Meal Prep Plans</h1>
        <p>
          Now that you have an <span>activated Meal Prep Plan</span>, you simply
          want to follow it by actually preparing the meals on the specified
          days.
        </p>
        <p>
          You will <span>receive reminder type notifications</span> the day you
          have to meal prep, 3 hours before the estimated time of meal prep
          start, at exactly the estimated time of meal prep start and 3 hours
          after the estimated time of meal prep start.
        </p>
        <p>
          For example, let’s say you wanted to meal prep 2 times a week, first
          meal prep covering Monday-Thursday and the second meal prep covering
          Friday-Sunday. Each one of those instances represent an Instance
          Template, thus a <span>Meal Prep Plan</span> represents the collection
          of those respective Instance Templates, on a weekly basis.
        </p>
        <p>
          You will receive notifications 3 hours after the estimated time of
          meal prep start prompting you to log your meal prep. This can be done
          through the app or any other logging measure. We recommend that you
          <span>log your meal preps</span> for future reference and for
          consistency sake.
        </p>
        <p>
          <span>NOTE:</span> All of the above can be changed in the
          Notifications Settings on the{" "}
          <Link href="/settings">Settings Page</Link>.
        </p>
      </section>
    </div>
  );
};

export default GettingStarted;
