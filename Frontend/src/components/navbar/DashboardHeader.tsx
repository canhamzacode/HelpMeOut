import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import logoIcon from "../../assets/logo-icon.png";
import { CgProfile } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";

type DashboardHeaderProps = {
  showHeader?: boolean;
};

const DashboardHeader = ({ showHeader = true }: DashboardHeaderProps) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const handleScroll = () => {
      document.body.style.overflow = modal ? "hidden" : "auto";
    };
    handleScroll();
  }, [modal]);
  return (
    <>
      {modal && (
        <div
          className="absolute z-10 top-0 w-full bg-[#00000052]
        h-screen"
        ></div>
      )}
      <header className="py-4 px-5 md:px-20 sm:px-10 grid gap-10 border-b-2 border-b-grey-light">
        <nav className="flex items-center justify-between ">
          <img src={logo} alt="Help Me Out Logo" className="hidden sm:flex" />
          <img
            src={logoIcon}
            alt="Help Me Out Logo"
            className="flex sm:hidden"
          />
          <div className="flex gap-3 justify-between items-center relative bg-white rounded-t  md:w-[250px] w-[200px] z-20">
            <div className="flex gap-3 items-center  p-2">
              <button className="bg-grey-light w-[40px] h-[40px] flex items-center justify-center rounded-[50%]">
                <CgProfile size={30} />
              </button>
              <p className="font-workSans">John Mark</p>
            </div>
            <button onClick={toggleModal}>
              <MdKeyboardArrowDown size={25} />
            </button>
            {modal && (
              <div className="absolute left-0 md:w-[250px] w-[200px] p-2 rounded-b bg-white border-t border-grey-light grid top-[50px]  ">
                <div className="flex">
                  <div className="flex items-center gap-2">
                    <TbLogout2 size={25} />
                    <p className="text-text-primary">Logout</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
        {showHeader && (
          <div className="w-full flex flex-col md:flex-row gap-3 justify-between items-center">
            <div className="w-full grid gap-2">
              <h1 className="text-3xl font-sora font-bold text-left">
                Hello, John Mark
              </h1>
              <p className="text-grey font-workSans text-lg">
                Here are your recorded videos
              </p>
            </div>
            <div className="flex gap-2 items-center md:w-[360px] bg-grey-light w-full p-[20px] rounded-lg">
              <BiSearch size={20} />
              <input
                type="text"
                placeholder="Search for a particular video"
                className="border-none outline-none bg-transparent w-full "
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default DashboardHeader;
