"use client";
// SCSS
import contactStyles from "../../../scss/pages/Contact.module.scss";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Data
import { siteEmail, sitePhoneNumber } from "@/data";
// Components
import SocialMediaIcons from "@/components/shared/SocialMediaIcons";
import PageTitle from "@/components/shared/PageTitle";
import TextFormControl from "@/components/shared/form/TextFormControl";
import TextAreaFormControl from "@/components/shared/form/TextAreaFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
// Helpers
import getPageTitlePropsBasedOnPathname from "@/helpers/getPageTitlePropsBasedOnPathname";
// React
import { useState } from "react";

const Contact = () => {
  useAuthorization();

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    getPageTitlePropsBasedOnPathname("/contact");

  return (
    <div className={contactStyles.contactContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
      <div className={contactStyles.contactContent}>
        <ContactEmailForm />
        <ContactInfo />
      </div>
    </div>
  );
};

const ContactEmailForm = () => {
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");

  return (
    <div className={contactStyles.contactEmailContainer}>
      <h4>Email Us</h4>
      <form className={contactStyles.contactEmailForm}>
        <TextFormControl
          entityProperty={emailSubject}
          labelContent="Subject:"
          onEntityPropertyValueChange={(e) => setEmailSubject(e.target.value)}
          type="text"
        />
        <TextAreaFormControl
          entityProperty={emailMessage}
          labelContent="Message:"
          onEntityPropertyValueChange={(e) => setEmailMessage(e.target.value)}
          maxInputLength={10000}
        />
      </form>
      <PrimaryButton
        content="Send Email"
        disabled={false}
        type="functional"
        onClickFunction={() => {
          console.log("do something");
        }}
      />
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className={contactStyles.contactInfoContainer}>
      <h4>Contact Us</h4>
      <div className={contactStyles.contactDetails}>
        <p>Phone Number: {sitePhoneNumber}</p>
        <p>Email: {siteEmail}</p>
      </div>
      <SocialMediaIcons />
    </div>
  );
};

export default Contact;
