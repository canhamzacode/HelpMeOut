import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import logoIcon from "../../assets/logo-icon.png";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-5 md:px-20 sm:px-10 relative">
      <img src={logo} alt="Help Me Out Logo" className="hidden sm:flex" />
      <img src={logoIcon} alt="Help Me Out Logo" className="flex sm:hidden" />
      <ul
        className={`md:flex gap-4 font-medium text-text-primary    ${
          showMobileMenu
            ? "text-white absolute top-[66px] bg-primary w-full left-0 p-4"
            : "hidden"
        }`}
      >
        <li>
          <Link className="font-workSans" to="/">
            Features
          </Link>
        </li>
        <li>
          <Link className="font-workSans" to="/">
            How It Works
          </Link>
        </li>
      </ul>
      <div className="flex gap-6">
        <Link to="/" className="font-sora font-semibold text-lg">
          Get Started
        </Link>
        <button onClick={toggleMobileMenu} className="flex md:hidden">
          <FaBars size={25} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
