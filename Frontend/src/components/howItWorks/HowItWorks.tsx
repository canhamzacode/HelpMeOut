import StepCard from "../stepCard/StepCard";
import step from "../../assets/how.svg";

const HowItWorks = () => {
  return (
    <div className="w-full grid gap-6 items-center  md:px-20 sm:px-10 px-5 py-9 ">
      <div>
        <h3 className="font-sora font-bold text-4xl text-center">
          How it works
        </h3>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        <StepCard
          img={step}
          title="Record Screen"
          num={1}
          description={`Click the "Start Recording" button in our extension. choose which part of your screen to capture and who you want to send it to.`}
        />
        <StepCard
          img={step}
          title="Share Your Recording"
          num={2}
          description="We generate a shareable link for your video. Simply send it to your audience via email or copy the link to send via any platform."
        />
        <StepCard
          img={step}
          title="Learn Effortlessly"
          num={3}
          description="Recipients can access your video effortlessly through the provided link, with our user-friendly interface suitable for everyone."
        />
      </div>
    </div>
  );
};

export default HowItWorks;
