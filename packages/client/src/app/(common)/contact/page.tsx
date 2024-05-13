"use client";
// SCSS
import contactStyles from "../../../scss/pages/Contact.module.scss";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Components
import PageTitle from "@/components/shared/PageTitle";
import ContactEmailForm from "@/components/page/contact/ContactEmailForm";
import ContactInfo from "@/components/page/contact/ContactInfo";

const Contact = () => {
  useAuthorization();

  return (
    <div className={contactStyles.contactContainer}>
      <PageTitle />
      <div className={contactStyles.contactContent}>
        <ContactEmailForm />
        <ContactInfo />
      </div>
    </div>
  );
};

export default Contact;
