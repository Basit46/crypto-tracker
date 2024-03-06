import React from "react";

const MessagesModal = ({ isMsgMOpen }) => {
  return (
    <div
      className={`${
        !isMsgMOpen && "hidden"
      } absolute top-[110%] right-0 w-[270px] h-fit border border-primary bg-white flex flex-col gap-[5px]  p-[5px]`}
    >
      <div className="py-[10px] bg-gray-100 px-[5px] w-full tracking-[1.5px]">
        <span className="font-medium">BTC</span>{" "}
        <span className="text-green-600 font-medium">up 300%</span> in last 24h
      </div>
      <div className="py-[10px] bg-gray-100 px-[5px] w-full tracking-[1.5px]">
        <span className="font-medium">BTC</span>{" "}
        <span className="text-green-600 font-medium">up 300%</span> in last 24h
      </div>
      <div className="py-[10px] bg-gray-100 px-[5px] w-full tracking-[1.5px]">
        <span className="font-medium">BTC</span>{" "}
        <span className="text-green-600 font-medium">up 300%</span> in last 24h
      </div>
      <div className="py-[10px] bg-gray-100 px-[5px] w-full tracking-[1.5px]">
        <span className="font-medium">BTC</span>{" "}
        <span className="text-green-600 font-medium">up 300%</span> in last 24h
      </div>
      <button className="mt-[10px] py-[10px] bg-[red] px-[5px] w-full tracking-[1.5px] text-white text-center">
        CLEAR ALL
      </button>
    </div>
  );
};

export default MessagesModal;
