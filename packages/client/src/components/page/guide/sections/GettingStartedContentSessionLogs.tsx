// SCSS
import gettingStartedContentStyles from "../../../../scss/pages/GettingStarted.module.scss";
// Next
import Image from "next/image";
import Link from "next/link";

const GettingStartedContentSessionLogs = () => {
  return (
    <section
      className={gettingStartedContentStyles.gettingStartedContentSection}
    >
      <h4>Session Logs</h4>
      <div
        className={gettingStartedContentStyles.gettingStartedContentArticles}
      >
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>What are Session Logs?</h5>
          <p>
            <span>Session Logs</span> represent the logs of your{" "}
            <span>active Meal Prep Plan Sessions</span>. In other words, they
            represent the saved instance of a{" "}
            <span>Meal Prep Plan Session</span>. They are very useful for
            <span>tracking Meal Prep Plan Sessions</span>.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715177907/VitalPrep/Screenshot_33_o5fzdm.png"
            alt="Active Meal Prep Plan View"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>How to create a Session Log?</h5>
          <p>
            <span>Session Logs</span> by default are <span>automatically</span>{" "}
            created 3 hours{" "}
            <span>after your active Meal Prep Plan Session</span>. This
            <span>behaviour</span> can be changed on the{" "}
            <Link href="/settings">Settings Page</Link> to either not create
            logs automatically, to create logs after a given number of hours
            instead of 3, or both.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715185596/VitalPrep/Screenshot_56_dvrgak.png"
            alt="Settings Page Image"
          />
          <p>
            <span>Session Logs</span> can also be created <span>manually</span>{" "}
            on the <span>Add Log Page</span>.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715185699/VitalPrep/Screenshot_57_mjxlki.png"
            alt="Add Session Log Page"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>How to view a Session Log?</h5>
          <p>
            To <span>view</span> all your <span>Session Logs</span>, use the
            <Link href="/multi-view-tool">Multi-View Tool Page</Link>. To view
            an <span>individual Session Log</span> in detail, click any{" "}
            <span>Session Log</span> component on the{" "}
            <Link href="/multi-view-tool">Multi-View Tool Page</Link>.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715185923/VitalPrep/Screenshot_59_bdjdnw.png"
            alt="Meal Prep Logs Page Image"
          />
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715185889/VitalPrep/Screenshot_58_aljwha.png"
            alt="Access Meal Prep Log"
          />
        </article>
      </div>
    </section>
  );
};

export default GettingStartedContentSessionLogs;
