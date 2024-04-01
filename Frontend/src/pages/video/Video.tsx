import { useEffect, useState } from "react";
import DashboardHeader from "../../components/navbar/DashboardHeader";
import Footer from "../../components/footer/Footer";
import Transcript from "../../components/transcript/Transcript";
import { Link, useParams } from "react-router-dom";
import ShareButtons from "../../components/shareButtons/ShareButtons";

type VideoProps = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
};
const Video = () => {
  const [videoData, setVideoData] = useState<VideoProps>();
  const { id } = useParams<string>();

  useEffect(() => {
    setVideoData({
      id: "",
      title: "How To Create A Facebook Ad Listing",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla",
      videoUrl: "",
    });
  }, []);

  return (
    <main className="relative">
      <DashboardHeader showHeader={false} />
      <section className="py-4 px-5 md:px-20 sm:px-10 grid gap-6 mt-5">
        <div className="grid gap-4">
          <div className="flex gap-2 md:text-lg text-base flex-wrap">
            <p>
              <Link to="/dashboard">Home</Link>
            </p>
            <p>/</p>
            <p className="text-primary-400 font-medium ">{videoData?.title}</p>
          </div>
          <div>
            <h2 className="font-workSans md:text-2xl text-xl font-medium">
              {videoData?.title}
            </h2>
          </div>
        </div>
        <div className="md:h-[498px] h-[300px] bg-grey-light border border-grey rounded-lg p-3 w-full">
          <video
            src={`blob:https://developer.chrome.com/${id}`}
            controls
            className="w-full h-full rounded-lg"
          ></video>
        </div>
      </section>
      <section className="py-4 px-5 md:px-20 sm:px-10 grid gap-5 mt-5 font-workSans">
        <p className="text-xl font-medium">Transcript</p>
        <div>
          <select
            className="bg-grey-light min-w-[150px] p-3 rounded-lg"
            name="lanuage"
            id="language"
          >
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
        <div className="h-[360px] overflow-auto grid gap-5 mb-4">
          <Transcript />
          <Transcript />
          <Transcript />
          <Transcript />
          <Transcript />
          <Transcript />
          <Transcript />
        </div>
      </section>
      <section className="py-4 px-5 md:px-20 sm:px-10 grid gap-4 mt-4">
        <div className="grid gap-10 md:grid-cols-2 grid-cols-1">
          <div className="p-2 flex gap-2 bg-grey-light rounded-md">
            <input
              className="border-none outline-none bg-transparent w-full"
              type="text"
              placeholder="Enter Emial Of Receiver"
            />
            <button className="px-3 py-2 rounded-lg bg-grey text-white">
              Send
            </button>
          </div>
          <div className="p-2 flex items-center gap-2 bg-grey-light rounded-md justify-between">
            <p>https://www.helpmeout/...</p>
            <button className="px-3 py-2 rounded-lg border-primary border">
              Copy URL
            </button>
          </div>
        </div>
        <div className="grid gap-3">
          <p className="text-xl font-semibold">Share Your Video</p>
        </div>
        <ShareButtons />
      </section>
      <Footer />
    </main>
  );
};

export default Video;
