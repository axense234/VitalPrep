// SCSS
import contactStyles from "../../../scss/pages/Contact.module.scss";
// Components
import SocialMediaIcons from "@/components/shared/SocialMediaIcons";
// Data
import { sitePhoneNumber, siteEmail } from "@/data";

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

export default ContactInfo;
