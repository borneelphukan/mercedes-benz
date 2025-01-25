import "../../styles/layout/Navbar.css";
import ThemeSwitch from "../ui/ThemeSwitch";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="mercedes-benz.svg" alt="Mercedes-Benz Logo" />
        </div>
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Navbar;
