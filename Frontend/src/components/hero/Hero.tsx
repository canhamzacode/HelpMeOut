import GreenOverlay from "../../assets/green-overlay.svg";
import GreyOverlay from "../../assets/grey-overlay.svg";
import LeftTop from "../../assets/leftTop.svg";
import LeftBottom from "../../assets/leftBottom.svg";
import Right from "../../assets/right.svg";
import arrow from "../../assets/arrow-right.png";
import "./hero.css";

const Hero = () => {
  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-5 items-center px-5 py-5 md:px-20 sm:px-10  border-y-2 border-y-grey-light">
      <div className="w-full flex flex-col gap-6">
        <h1 className="font-sora sm:text-6xl text-5xl font-bold">
          Show Them <br />
          Don’t Just Tell
        </h1>
        <p>
          Help your friends and loved ones by creating and sending videos on how
          to get things done on a website.
        </p>
        <button className="flex items-center gap-2 bg-primary px-6 py-5 w-[239px] rounded-lg text-white">
          <p>Install HelpMeOut</p>
          <img src={arrow} alt="" />
        </button>
      </div>
      <div className="relative min-h-[70vh] w-full flex items-center justify-center">
        <img
          src={GreenOverlay}
          alt=""
          className=" top-0 md:top-[-100px] right-0 absolute w-full max-w-[350px] z-[-1]"
        />
        <img
          src={GreyOverlay}
          alt=""
          className=" bottom-0  left-0 absolute w-full max-w-[350px] z-[-1]"
        />
        <div className="heroGrid">
          <img src={LeftTop} className="topLeft object-contain" alt="" />
          <img src={LeftBottom} className="bottomLeft object-contain" alt="" />
          <img src={Right} className="right object-contain" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
