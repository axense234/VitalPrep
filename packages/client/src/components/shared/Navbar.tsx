// SCSS
import navbarStyles from "../../scss/components/shared/Navbar.module.scss";
// Components
import Logo from "./Logo";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  return (
    <nav className={navbarStyles.navbarContainer}>
      <Logo />
      <NavbarMenu />
    </nav>
  );
};

export default Navbar;
