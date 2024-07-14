"use client";

// SCSS
import { LuMenuSquare } from "react-icons/lu";
// React Icons
import navbarMenuStyles from "@/scss/components/shared/NavbarMenu.module.scss";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { changeIsSidebarOpened } from "@/redux/slices/general/slice";
// Translations
import { useTranslations } from "next-intl";

const NavbarMenu = () => {
  const dispatch = useAppDispatch();
  const translate = useTranslations("navbar.navbarMenu");

  return (
    <button
      className={navbarMenuStyles.navbarMenuContainer}
      onClick={() => dispatch(changeIsSidebarOpened(true))}
    >
      <LuMenuSquare
        aria-label={translate("title")}
        title={translate("title")}
      />
    </button>
  );
};

export default NavbarMenu;
