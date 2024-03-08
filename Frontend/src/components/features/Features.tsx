import preview from "../../assets/preview.svg";
import FeatureCard from "../featureCard/FeatureCard";
import Simple from "../../assets/simple.svg";
import Easy from "../../assets/easy.svg";
import revisit from "../../assets/revisit.svg";

const Features = () => {
  return (
    <div className="w-full grid gap-6 items-center  md:px-20 sm:px-10 px-5 py-6 ">
      <div className="w-full text-center grid gap-2">
        <h3 className="text-text-primary text-[40px] font-sora font-bold">
          Features
        </h3>
        <p className="text-lg font-workSans text-grey">
          Key Highlights of Our Extension
        </p>
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-7 items-center justify-center">
        <div className="w-full grid gap-6">
          <FeatureCard
            img={Simple}
            title="Simple Screen Recording"
            description="Effortless screen recording for everyone. Record with ease, no tech expertise required."
          />
          <FeatureCard
            img={Easy}
            title="Easy-to-Share URL"
            description="Share your recordings instantly with a single link. No attachments, no downloads."
          />
          <FeatureCard
            img={revisit}
            title="Revisit Recordings"
            description="Access and review your past content effortlessly. Your recordings, always at your fingertips."
          />
        </div>
        <div className="w-full h-full">
          <img src={preview} alt="" className="w-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Features;
