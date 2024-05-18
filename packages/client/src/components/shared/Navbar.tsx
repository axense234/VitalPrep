// SCSS
import navbarStyles from "../../scss/components/shared/Navbar.module.scss";
// Components
import NavbarMenu from "./NavbarMenu";
import LangSwitcher from "./LangSwitcher";
import NavbarProfile from "./NavbarProfile";

const Navbar = () => {
  return (
    <nav className={navbarStyles.navbarContainer}>
      <NavbarProfile />
      <div className={navbarStyles.navbarMenuWrapper}>
        <LangSwitcher />
        <NavbarMenu />
      </div>
    </nav>
  );
};

export default Navbar;
