import { Link } from "react-router-dom";
import logo from "../../assets/logo-white.png";
const Footer = () => {
  return (
    <div className="py-4 px-5 md:px-20 sm:px-10 bg-primary">
      <div className="flex flex-wrap items-center md:justify-between justify-center gap-2">
        <img src={logo} alt="Help Me Out Logo" />
        <p className="text-white text-lg">
          Built with 😍😍 by{" "}
          <Link
            className="bg-white text-primary font-bold"
            to="https://www.frontendmentor.io/profile/yourusername"
          >
            Hamzat Abdul-Muizz
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
