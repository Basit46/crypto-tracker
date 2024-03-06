import React from "react";
import { useAuthContext } from "../context/authContext";

const UserModal = ({ isUserMOpen, setIsUserMOpen }) => {
  const { signUserOut } = useAuthContext();

  return (
    <div
      className={`${
        !isUserMOpen && "hidden"
      } absolute top-[110%] right-0 w-[100px] h-[60px] border border-primary bg-white flex items-end p-[5px]`}
    >
      <button
        onClick={() => {
          signUserOut();
          setIsUserMOpen(false);
        }}
        className="bg-primary text-white w-full py-[2px] border border-primary hover:bg-white hover:text-primary"
      >
        LOG OUT
      </button>
    </div>
  );
};

export default UserModal;
