import React, { useState } from "react";
import { BiMessageSquare } from "react-icons/bi";
import { IoChevronDown } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import UserModal from "../modals/UserModal";
import MessagesModal from "../modals/MessagesModal";
import { useAuthContext } from "../context/authContext";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";

const Header = () => {
  const { user, signIn } = useAuthContext();
  const { isOpen, setIsOpen } = useGlobalContext();

  const [isUserMOpen, setIsUserMOpen] = useState(false);
  const [isMsgMOpen, setIsMsgMOpen] = useState(false);

  return (
    <header className="h-[65px] bg-white sticky z-[4] top-0 border-b border-b-primary px-[40px] flex justify-between items-center">
      <p className="hidden md:block text-[1.5rem] font-semibold">
        Hello, {user?.displayName} 👋
      </p>
      <Link to="/" className="block md:hidden text-[1.5rem] font-semibold">
        CT
      </Link>

      <div className="flex gap-[40px] items-center">
        <div className="relative">
          <div
            onClick={() => setIsMsgMOpen((prev) => !prev)}
            className="h-[40px] w-[40px] cursor-pointer rounded-full border-[1px] border-primary grid place-items-center"
          >
            <BiMessageSquare />
            <span className="absolute top-[-9px] right-[-5px] bg-[red] h-[20px] w-[20px] rounded-full text-[10px] grid place-items-center text-white">
              1
            </span>
          </div>
          <MessagesModal isMsgMOpen={isMsgMOpen} />
        </div>

        {!user ? (
          <button
            onClick={signIn}
            className="bg-[#4285F4] text-white flex items-center gap-[10px] rounded-[10px] px-[14px] py-[7px]"
          >
            <FcGoogle />
            <p>Sign In</p>
          </button>
        ) : (
          <div className="relative flex gap-[5px] items-center">
            <div className="bg-primary h-[40px] w-[40px] rounded-full grid place-items-center">
              <p className="text-white text-[1.2rem] font-bold">
                {user.displayName.slice(0, 1)}
              </p>
            </div>
            <button>
              <IoChevronDown
                onClick={() => setIsUserMOpen((prev) => !prev)}
                className={`${isUserMOpen && "rotate-180"} duration-300 `}
              />
            </button>

            <UserModal
              isUserMOpen={isUserMOpen}
              setIsUserMOpen={setIsUserMOpen}
            />
          </div>
        )}

        {isOpen ? (
          <FaTimes
            onClick={() => setIsOpen(false)}
            className="xl:hidden text-[red] cursor-pointer text-[24px]"
          />
        ) : (
          <FaBars
            onClick={() => setIsOpen(true)}
            className="xl:hidden cursor-pointer text-[24px]"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
