"use client";
// SCSS
import sidebarStyles from "../../scss/components/shared/Sidebar.module.scss";
// Types
import PageLink from "@/core/types/PageLink";
// React
import { FC, useEffect, useRef } from "react";
// Next
import { usePathname } from "next/navigation";
// Data
import { pageLinks } from "@/data";
// React Icons
import { AiFillCloseSquare } from "react-icons/ai";
// Components
import Logo from "./Logo";
import SocialMediaIcons from "./SocialMediaIcons";
// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// Translations
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
// Redux
import { selectIsSidebarOpened } from "@/redux/slices/general/selectors";
import { changeIsSidebarOpened } from "@/redux/slices/general/slice";
import { logoutUser } from "@/redux/slices/general/thunks";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLElement>(null);
  const isSidebarOpened = useAppSelector(selectIsSidebarOpened);

  const pathname = usePathname();

  useEffect(() => {
    dispatch(changeIsSidebarOpened(false));
  }, [pathname]);

  useEffect(() => {
    const sidebar = sidebarRef.current as HTMLElement;
    if (isSidebarOpened) {
      sidebar.style.transform = "translateX(0%)";
    } else {
      sidebar.style.transform = "translateX(150%)";
    }
  }, [isSidebarOpened]);

  return (
    <aside className={sidebarStyles.sidebarContainer} ref={sidebarRef}>
      <SidebarHeader />
      <SidebarPageLinks />
      <SidebarFooter />
    </aside>
  );
};

const SidebarHeader = () => {
  const dispatch = useAppDispatch();
  const translate = useTranslations("sidebar");

  return (
    <header className={sidebarStyles.sidebarHeader}>
      <button
        onClick={() => dispatch(changeIsSidebarOpened(false))}
        title={translate("closeSidebarButtonTitle")}
        aria-label={translate("closeSidebarButtonTitle")}
      >
        <AiFillCloseSquare />
      </button>
      <h3>Vital Prep</h3>
    </header>
  );
};

const SidebarPageLinks = () => {
  const translate = useTranslations("pageLinks.labels");
  return (
    <ul className={sidebarStyles.sidebarPageLinks}>
      {pageLinks.map((pageLink) => {
        return (
          <li
            key={pageLink.id}
            title={translate(`${pageLink.linkDest}`)}
            aria-label={translate(`${pageLink.linkDest}`)}
          >
            <SidebarPageLink {...pageLink} />
          </li>
        );
      })}
    </ul>
  );
};

const SidebarPageLink: FC<PageLink> = ({ linkDest, reactIcon, linkType }) => {
  const dispatch = useAppDispatch();
  const translate = useTranslations("pageLinks.labels");
  if (linkType === "logout") {
    return (
      <button
        title={translate(`${linkDest}`)}
        aria-label={translate(`${linkDest}`)}
        className={sidebarStyles.sidebarPageLink}
        onClick={() => dispatch(logoutUser())}
      >
        {reactIcon}
        <p>{translate(`${linkDest}`)}</p>
      </button>
    );
  }
  return (
    <Link
      href={linkDest as any}
      title={translate(`${linkDest}`)}
      aria-label={translate(`${linkDest}`)}
      className={sidebarStyles.sidebarPageLink}
    >
      {reactIcon}
      <p>{translate(`${linkDest}`)}</p>
    </Link>
  );
};

const SidebarFooter = () => {
  return (
    <footer className={sidebarStyles.sidebarFooter}>
      <Logo dimensions={72} logoImageUrlIndex={2} clickable />
      <SocialMediaIcons />
    </footer>
  );
};

export default Sidebar;
