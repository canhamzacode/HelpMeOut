import React from "react";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const ShareButtons = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="border-primary border  rounded-md p-3 flex gap-2 items-center font-bold">
        <FaFacebook color="#1877F2" size={20} />
        Facebook
      </button>
      <button className="border-primary border  rounded-md p-3 flex gap-2 items-center font-bold">
        <BsWhatsapp color="#25D366" size={20} />
        WhatsApp
      </button>
      <button className="border-primary border  rounded-md p-3 flex gap-2 items-center font-bold">
        <BsTelegram color="#2AABEE" size={20} />
        Telegram
      </button>
    </div>
  );
};

export default ShareButtons;
