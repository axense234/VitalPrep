// SCSS
import contactStyles from "../../../scss/pages/Contact.module.scss";
// Components
import SocialMediaIcons from "@/components/shared/SocialMediaIcons";
// Data
import { sitePhoneNumber, siteEmail } from "@/data";
// Translations
import { useTranslations } from "next-intl";

const ContactInfo = () => {
  const translateContactInfo = useTranslations("contact.contactInfo");

  return (
    <div className={contactStyles.contactInfoContainer}>
      <h4>{translateContactInfo("title")}</h4>
      <div className={contactStyles.contactDetails}>
        <p>
          {translateContactInfo("info.phoneNumber", {
            phoneNumber: sitePhoneNumber,
          })}
        </p>
        <p>{translateContactInfo("info.email", { email: siteEmail })}</p>
      </div>
      <SocialMediaIcons />
    </div>
  );
};

export default ContactInfo;
