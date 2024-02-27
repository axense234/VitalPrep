// SCSS
import { LuMenuSquare } from "react-icons/lu";
// React Icons
import navbarMenuStyles from "../../scss/components/shared/NavbarMenu.module.scss";

const NavbarMenu = () => {
  return (
    <div className={navbarMenuStyles.navbarMenuContainer}>
      <LuMenuSquare aria-label="Open Sidebar" title="Open Sidebar." />
    </div>
  );
};

export default NavbarMenu;
