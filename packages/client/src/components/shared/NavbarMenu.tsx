"use client";

// SCSS
import { LuMenuSquare } from "react-icons/lu";
// React Icons
import navbarMenuStyles from "../../scss/components/shared/NavbarMenu.module.scss";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { changeIsSidebarOpened } from "@/redux/slices/generalSlice";

const NavbarMenu = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className={navbarMenuStyles.navbarMenuContainer}
      onClick={() => dispatch(changeIsSidebarOpened(true))}
    >
      <LuMenuSquare aria-label="Open Sidebar" title="Open Sidebar." />
    </button>
  );
};

export default NavbarMenu;
