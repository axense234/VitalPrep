// SCSS
import contactStyles from "../../../scss/pages/Contact.module.scss";
// React
import { useState } from "react";
// Components
import PrimaryButton from "@/components/shared/PrimaryButton";
import TextAreaFormControl from "@/components/shared/form/TextAreaFormControl";
import TextFormControl from "@/components/shared/form/TextFormControl";
// Translations
import { useTranslations } from "next-intl";

const ContactEmailForm = () => {
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");

  const translateEmailForm = useTranslations("contact.emailForm");

  return (
    <div className={contactStyles.contactEmailContainer}>
      <h4>{translateEmailForm("title")}</h4>
      <form className={contactStyles.contactEmailForm}>
        <TextFormControl
          entityProperty={emailSubject}
          labelContent={translateEmailForm("formLabels.subject")}
          onEntityPropertyValueChange={(e) => setEmailSubject(e.target.value)}
          type="text"
        />
        <TextAreaFormControl
          entityProperty={emailMessage}
          labelContent={translateEmailForm("formLabels.message")}
          onEntityPropertyValueChange={(e) => setEmailMessage(e.target.value)}
          maxInputLength={10000}
        />
      </form>
      <PrimaryButton
        content={translateEmailForm("formLabels.buttonContent")}
        disabled={false}
        type="functional"
        onClickFunction={() => {
          console.log("do something");
        }}
      />
    </div>
  );
};

export default ContactEmailForm;
