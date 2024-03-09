import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdLink } from "react-icons/io";

const DashboardCard = () => {
  return (
    <div className="grid gap-2 p-4 border border-grey-light  rounded-xl">
      <div className="h-[200px]  border-grey-light rounded-xl">
        <video src="" controls className="w-full h-full"></video>
      </div>
      <div className="flex items-center justify-between gap-2 text-text-primary">
        <div>
          <h3 className="font-workSans text-xl">
            How to create Facebook Ad listing
          </h3>
          <p className="text-base text-grey">SEPTEMBER 23, 2023</p>
        </div>
        <div className="flex gap-2 items-center">
          <IoMdLink size={20} />
          <BsThreeDotsVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
