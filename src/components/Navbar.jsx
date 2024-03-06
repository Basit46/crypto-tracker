import React from "react";
import { IoHome, IoNotifications } from "react-icons/io5";
import { PiUserListFill } from "react-icons/pi";
import { FaWallet } from "react-icons/fa6";
import { ImNewspaper } from "react-icons/im";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 h-screen w-[280px] bg-primary text-white pt-[30px] pl-[20px]">
      <h1 className="text-[1.5rem] font-bold">Crypto Tracker</h1>

      <ul className="mt-[90px] flex flex-col gap-[40px]">
        <NavLink to="/">
          <IoHome /> <p>Home</p>
        </NavLink>
        <NavLink to="/watchlist">
          <PiUserListFill /> <p>WatchList</p>
        </NavLink>
        <NavLink to="/portfolio">
          <FaWallet /> <p>Portfolio</p>
        </NavLink>
        <NavLink to="/news">
          <ImNewspaper /> <p>News</p>
        </NavLink>
        <NavLink to="/notifications">
          <IoNotifications /> <p>Notifications</p>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
