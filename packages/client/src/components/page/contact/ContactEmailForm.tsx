// SCSS
import contactStyles from "../../../scss/pages/Contact.module.scss";
// React
import { useState } from "react";
// Components
import PrimaryButton from "@/components/shared/PrimaryButton";
import TextAreaFormControl from "@/components/shared/form/TextAreaFormControl";
import TextFormControl from "@/components/shared/form/TextFormControl";

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

export default ContactEmailForm;
