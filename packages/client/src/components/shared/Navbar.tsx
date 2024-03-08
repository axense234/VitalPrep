// SCSS
import navbarStyles from "../../scss/components/shared/Navbar.module.scss";
// Components
import Logo from "./Logo";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  return (
    <nav className={navbarStyles.navbarContainer}>
      <Logo dimensions={100} logoImageUrlIndex={1} />
      <NavbarMenu />
    </nav>
  );
};

export default Navbar;
