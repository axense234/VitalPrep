// SCSS
import navbarStyles from "../../scss/components/shared/Navbar.module.scss";
// Components
import NavbarMenu from "./NavbarMenu";
import NavbarProfile from "./NavbarProfile";

const Navbar = () => {
  return (
    <nav className={navbarStyles.navbarContainer}>
      <NavbarProfile />
      <NavbarMenu />
    </nav>
  );
};

export default Navbar;
