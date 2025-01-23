import { useTheme } from "../../utilities/ThemeContext";
import "./Footer.css";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="footer">
      <p>
        Borneel Bikash Phukan &copy; {new Date().getFullYear()} All Rights
        Reserved
      </p>
    </footer>
  );
};

export default Footer;
