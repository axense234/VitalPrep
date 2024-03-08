"use client";

// SCSS
import sidebarStyles from "../../scss/components/shared/Sidebar.module.scss";
// Types
import PageLink from "@/core/types/PageLink";
// React
import { FC } from "react";
// Next
import Link from "next/link";
// Data
import { pageLinks } from "@/data";
// React Icons
import { AiFillCloseSquare } from "react-icons/ai";
// Components
import Logo from "./Logo";
import SocialMediaIcons from "./SocialMediaIcons";
import {
  changeIsSidebarOpened,
  selectIsSidebarOpened,
} from "@/redux/slices/generalSlice";
// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const Sidebar = () => {
  const isSidebarOpened = useAppSelector(selectIsSidebarOpened);

  if (!isSidebarOpened) {
    return null;
  }

  return (
    <aside className={sidebarStyles.sidebarContainer}>
      <SidebarHeader />
      <SidebarPageLinks />
      <SidebarFooter />
    </aside>
  );
};

const SidebarHeader = () => {
  const dispatch = useAppDispatch();

  return (
    <header className={sidebarStyles.sidebarHeader}>
      <button onClick={() => dispatch(changeIsSidebarOpened(false))}>
        <AiFillCloseSquare />
      </button>
      <h3>Vital Prep</h3>
    </header>
  );
};

const SidebarPageLinks = () => {
  return (
    <ul className={sidebarStyles.sidebarPageLinks}>
      {pageLinks.map((pageLink) => {
        return (
          <li key={pageLink.id}>
            <SidebarPageLink {...pageLink} />
          </li>
        );
      })}
    </ul>
  );
};

const SidebarPageLink: FC<PageLink> = ({ linkDest, linkTitle, reactIcon }) => {
  return (
    <Link
      href={linkDest}
      title={linkTitle}
      aria-label={linkTitle}
      className={sidebarStyles.sidebarPageLink}
    >
      {reactIcon}
      <p>{linkTitle}</p>
    </Link>
  );
};

const SidebarFooter = () => {
  return (
    <footer className={sidebarStyles.sidebarFooter}>
      <Logo dimensions={72} logoImageUrlIndex={2} />
      <SocialMediaIcons />
    </footer>
  );
};

export default Sidebar;
