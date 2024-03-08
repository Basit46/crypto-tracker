import React from "react";
import { IoHome, IoNotifications } from "react-icons/io5";
import { PiUserListFill } from "react-icons/pi";
import { FaWallet } from "react-icons/fa6";
import { ImNewspaper } from "react-icons/im";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";

const Navbar = () => {
  const { isOpen, setIsOpen } = useGlobalContext();

  return (
    <nav
      className={`${
        isOpen ? "block" : "hidden"
      }  xl:block z-[6] fixed xl:sticky top-0 h-screen w-[280px] bg-primary text-white pt-[30px] pl-[20px]`}
    >
      <Link
        onClick={() => setIsOpen(false)}
        to="/"
        className="text-[1.5rem] font-bold"
      >
        Crypto Tracker
      </Link>

      <ul className="mt-[90px] flex flex-col gap-[40px]">
        <NavLink onClick={() => setIsOpen(false)} to="/">
          <IoHome /> <p>Home</p>
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} to="/watchlist">
          <PiUserListFill /> <p>WatchList</p>
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} to="/portfolio">
          <FaWallet /> <p>Portfolio</p>
        </NavLink>
        {/* <NavLink onClick={() => setIsOpen(false)} to="/news">
          <ImNewspaper /> <p>News</p>
        </NavLink> */}
        <NavLink onClick={() => setIsOpen(false)} to="/notifications">
          <IoNotifications /> <p>Notifications</p>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
