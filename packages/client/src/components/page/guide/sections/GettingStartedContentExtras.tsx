// SCSS
import gettingStartedContentStyles from "../../../../scss/pages/GettingStarted.module.scss";
// Next
import Image from "next/image";
import Link from "next/link";

const GettingStartedContentExtras = () => {
  return (
    <section
      className={gettingStartedContentStyles.gettingStartedContentSection}
    >
      <h4>Profile, Settings and Extras</h4>
      <div
        className={gettingStartedContentStyles.gettingStartedContentArticles}
      >
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Profile</h5>
          <p>
            To view your <span>Profile</span>, you can either access it through
            the <span>Navigation Bar</span> or <span>Side Bar</span> to be sent
            to the <Link href="/profile">Profile Page</Link>.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715187350/VitalPrep/Screenshot_60_cch6wk.png"
            alt="Profile Link in Side Bar Image"
          />
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715187384/VitalPrep/Screenshot_61_frtxb0.png"
            alt="Profile Image Title Image"
          />
          <p>
            On the <Link href="/profile">Profile Page</Link> you can view your
            username, email, age, statistics and all of the entities you have
            created.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715187473/VitalPrep/Screenshot_62_u2tbk6.png"
            alt="Profile Page Details Image"
          />
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715187500/VitalPrep/Screenshot_63_ovkvtp.png"
            alt="Profile Page Entities Created Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Settings</h5>
          <p>
            Your <span>profile details</span> or{" "}
            <span>notification settings</span> can be changed on the{" "}
            <Link href="/settings">Settings Page</Link>.
          </p>
          <p>
            The available <span>Profile Settings</span> are: username, email,
            password, profile image.{" "}
          </p>
          <p>
            The available <span>Notification Settings</span> are: unable/disable
            notifications, notification image, notification message style.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715185596/VitalPrep/Screenshot_56_dvrgak.png"
            alt="Settings Page Title Image"
          />
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715187685/VitalPrep/Screenshot_64_vxekot.png"
            alt="Settings Page Settings Form Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Feedback</h5>
          <p>
            To give us some <span>feedback</span> on the app, you can do so by
            emailing us using the email form on the Contact Page. All feedback
            is welcome, even if it is negative.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715187774/VitalPrep/Screenshot_65_gkix9r.png"
            alt="Feedback Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Notifications</h5>
          <p>
            To receive <span>reminder type notifications</span> while having a
            <span>Meal Prep Plan active</span> you have to{" "}
            <span>subscribe to our notifications service</span> either through
            the <span>bell</span> fixed on the bottom right corner of the screen
            or through our <span>modal</span>.
          </p>
          <p>
            You can <span>unsubscribe</span> whenever you want by clicking the
            bell then Unsubscribe.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715188301/VitalPrep/Screenshot_66_ryl1fc.png"
            alt="Notifications Bell Image"
          />
        </article>
        <article
          className={gettingStartedContentStyles.gettingStartedContentArticle}
        >
          <h5>Conclusion</h5>
          <p>
            With everything that you learned, you can now use our app to meal
            prep in a more organized matter, while having logging capabilities
            and reminder type notifications available to you. We hope that this
            will help you stay consistent with meal prepping.
          </p>
          <Image
            width={720}
            height={480}
            src="https://res.cloudinary.com/birthdayreminder/image/upload/v1715188430/VitalPrep/brandmark-design-1920x1080_sp2kds.png"
            alt="VitalPrep Logo Image"
          />
        </article>
      </div>
    </section>
  );
};

export default GettingStartedContentExtras;
