import logo from "../../assets/logo.png";
import logoIcon from "../../assets/logo-icon.png";
import { CgProfile } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";

const Dashboard = () => {
  return (
    <div>
      <nav className="flex items-center justify-between py-4 px-5 md:px-20 sm:px-10">
        <img src={logo} alt="Help Me Out Logo" className="hidden sm:flex" />
        <img src={logoIcon} alt="Help Me Out Logo" className="flex sm:hidden" />
        <div className="flex gap-3 items-center">
          <CgProfile size={30} />
          <p className="font-workSans">John Mark</p>
          <button>
            <MdKeyboardArrowDown size={25} />
          </button>
        </div>
      </nav>
      <header className="w-full flex "></header>
    </div>
  );
};

export default Dashboard;
