"use client";
// SCSS
import contactStyles from "../../../scss/pages/Contact.module.scss";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Data
import { siteEmail, sitePhoneNumber } from "@/data";
// Components
import SocialMediaIcons from "@/components/shared/SocialMediaIcons";

const Contact = () => {
  useAuthorization();

  return (
    <div className={contactStyles.contactContainer}>
      <h1>Contact Us</h1>
      <div className={contactStyles.contactDetails}>
        <p>Phone Number: {sitePhoneNumber}</p>
        <p>Email: {siteEmail}</p>
      </div>
      <SocialMediaIcons />
    </div>
  );
};

export default Contact;
