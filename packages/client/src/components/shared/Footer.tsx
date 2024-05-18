"use client";

// Data
import { pageLinks, siteEmail, sitePhoneNumber } from "@/data";
// SCSS
import footerStyles from "../../scss/components/shared/Footer.module.scss";
// Components
import Logo from "./Logo";
import SocialMediaIcons from "./SocialMediaIcons";
// Types
import PageLink from "@/core/types/PageLink";
// React
import { FC } from "react";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { logoutUser } from "@/redux/slices/generalSlice";
// Hooks
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
// Translations
import { useTranslations } from "use-intl";
import { Link } from "@/navigation";

const Footer = () => {
  let windowWidth = useGetWindowWidth();
  let tabletAndPhoneRedesign = windowWidth && windowWidth <= 600;

  return (
    <footer className={footerStyles.footerContainer}>
      <FooterPageLinks />
      {tabletAndPhoneRedesign ? null : <FooterContact />}
      <FooterBar />
    </footer>
  );
};

const FooterPageLinks = () => {
  const translate = useTranslations("pageLinks.labels");
  return (
    <ul className={footerStyles.footerPageLinksList}>
      {pageLinks.map((pageLink) => {
        return (
          <li
            key={pageLink.id}
            title={translate(`${pageLink.linkDest}`)}
            aria-label={translate(`${pageLink.linkDest}`)}
          >
            <FooterPageLink {...pageLink} />
          </li>
        );
      })}
    </ul>
  );
};

const FooterPageLink: FC<PageLink> = ({ linkType, linkDest }) => {
  const dispatch = useAppDispatch();
  const translate = useTranslations("pageLinks.labels");

  if (linkType === "logout") {
    return (
      <button
        className={footerStyles.footerPageLink}
        title={translate(`${linkDest}`)}
        aria-label={translate(`${linkDest}`)}
        onClick={() => dispatch(logoutUser())}
      >
        <p>{translate(`${linkDest}`)}</p>
      </button>
    );
  }
  return (
    <Link
      className={footerStyles.footerPageLink}
      href={linkDest as any}
      title={translate(`${linkDest}`)}
      aria-label={translate(`${linkDest}`)}
    >
      <p>{translate(`${linkDest}`)}</p>
    </Link>
  );
};

const FooterContact = () => {
  const translate = useTranslations("footer.contact");
  return (
    <div className={footerStyles.footerContact}>
      <p
        title={translate("phoneNumberTitle")}
        aria-label={translate("phoneNumberTitle")}
      >
        {translate("phoneNumberTitle")}
        <span>{sitePhoneNumber}</span>
      </p>
      <p title={translate("emailTitle")} aria-label={translate("emailTitle")}>
        {translate("emailTitle")}
        <span>{siteEmail}</span>
      </p>
    </div>
  );
};

const FooterBar = () => {
  return (
    <div className={footerStyles.footerBar}>
      <div className={footerStyles.footerCopyright}>
        <Logo dimensions={100} logoImageUrlIndex={1} clickable />
        <p>axense's Team Copyright &copy; 2024</p>
      </div>
      <SocialMediaIcons />
    </div>
  );
};

export default Footer;
