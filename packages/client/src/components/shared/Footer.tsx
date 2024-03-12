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
// Next
import Link from "next/link";
import { signOut } from "next-auth/react";

const Footer = () => {
  return (
    <footer className={footerStyles.footerContainer}>
      <FooterPageLinks />
      <FooterContact />
      <FooterBar />
    </footer>
  );
};

const FooterPageLinks = () => {
  return (
    <ul className={footerStyles.footerPageLinksList}>
      {pageLinks.map((pageLink) => {
        return (
          <li
            key={pageLink.id}
            title={pageLink.linkTitle}
            aria-label={pageLink.linkTitle}
          >
            <FooterPageLink {...pageLink} />
          </li>
        );
      })}
    </ul>
  );
};

const FooterPageLink: FC<PageLink> = ({ linkDest, linkTitle, linkType }) => {
  if (linkType === "logout") {
    return (
      <button
        className={footerStyles.footerPageLink}
        title={linkTitle}
        aria-label={linkTitle}
        onClick={() =>
          signOut({ redirect: true, callbackUrl: "http://localhost:3000/" })
        }
      >
        <p>{linkTitle}</p>
      </button>
    );
  }
  return (
    <Link
      className={footerStyles.footerPageLink}
      href={linkDest}
      title={linkTitle}
      aria-label={linkTitle}
    >
      <p>{linkTitle}</p>
    </Link>
  );
};

const FooterContact = () => {
  return (
    <div className={footerStyles.footerContact}>
      <p title="Phone Number" aria-label="Phone Number">
        Phone Number:
        <span>{sitePhoneNumber}</span>
      </p>
      <p title="Email" aria-label="Email">
        Email:
        <span>{siteEmail}</span>
      </p>
    </div>
  );
};

const FooterBar = () => {
  return (
    <div className={footerStyles.footerBar}>
      <div className={footerStyles.footerCopyright}>
        <Logo dimensions={100} logoImageUrlIndex={1} />
        <p>axense's Team Copyright &copy; 2024</p>
      </div>
      <SocialMediaIcons />
    </div>
  );
};

export default Footer;
