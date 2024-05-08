// SCSS
import gettingStartedContentStyles from "../../../../scss/pages/GettingStarted.module.scss";
// Next
import Image from "next/image";
import Link from "next/link";

const GettingStartedContentBasics = () => {
  return (
    <section
      className={gettingStartedContentStyles.gettingStartedContentSection}
    >
      <h4>The Basics</h4>
      <div
        className={gettingStartedContentStyles.gettingStartedContentArticles}
      >
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Guide's Goal</h5>
          <p>
            <span>NOTE:</span> The following tutorial requires prior knowledge
            of meal prepping. If you do not know anything about meal prepping,
            try reading a bit online or checkout the{" "}
            <Link href="/faq">FAQ Page</Link>.
          </p>
          <p>
            This guide’s <span>goal</span> is to teach you how to create a{" "}
            <span>Meal Prep Plan</span> in order to use it in a practical way by
            activating it so you can be notified whenever you need to prepare
            your meals.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715177907/VitalPrep/Screenshot_33_o5fzdm.png"
            alt="Guide Goal Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Create Tool Page</h5>
          <p>
            In order to create a <span>Meal Prep Plan</span>, you will first
            need to create quite a few <span>entities</span>. To create{" "}
            <span>entities</span>, you will have to use the{" "}
            <Link href="/create-tool"> Create Tool Page</Link>. Simply complete
            the form, observe the preview to see if it’s to your liking, then
            create said entity.
          </p>
          <p>
            To change the create tool interface, use the menu on the left of
            your screen, which can be hidden/shown as needed.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715179083/VitalPrep/Screenshot_35_sh7nyg.png"
            alt="Create Tool Page Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Multi-View Tool Page</h5>
          <p>
            In order to <span>view</span> your created <span>entities</span>,
            you will need to use the{" "}
            <Link href="/multi-view-tool"> Multi-View Tool Page</Link>. Adjust
            the filtering options to your needs.
          </p>
          <p>
            The <span>filtering options</span> available are:{" "}
            <span>entity type</span>(changes what entity is shown),{" "}
            <span>sort by</span>(sorts shown entity by a property of their, for
            example their names), <span>search</span>(search entities that
            contain the text given in their name), <span>list/grid view</span>
            (changes entity view type).
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715178126/VitalPrep/Screenshot_34_vb9vwf.png"
            alt="Multi-View Tool Page Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>View Tool Page</h5>
          <p>
            In order to <span>view</span> your created{" "}
            <span>entities individually</span>, you will need to use the{" "}
            <span style={{ color: "#646aff" }}>View Tool Page</span>, accessed
            through by <span>clicking</span> any entity component.
          </p>
          <p>
            On said page you can <span>view different properties</span> of the
            respective entity, like their <span>name</span>, <span>image</span>,
            <span>calories</span>(if they have any), <span>macros</span>(on any
            entity type except utensil, duh), etc.
          </p>
          <p>
            You can also view the <span>statistics</span> of the respective
            entity, what entities they are <span>composed of</span>, what other
            entities are <span>composed of them</span>.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715179643/VitalPrep/Screenshot_37_lo4qpe.png"
            alt="Multi-View Tool Page Image"
          />
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715179504/VitalPrep/Screenshot_36_yaa7zm.png"
            alt="View Tool Page Image"
          />
        </article>
      </div>
    </section>
  );
};

export default GettingStartedContentBasics;
