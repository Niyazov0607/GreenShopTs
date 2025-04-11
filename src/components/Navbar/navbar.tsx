import React from "react";
import logoImg from "../../assets/logogreen.svg";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoCartOutline, IoLogInOutline } from "react-icons/io5";
import { NavLink } from "react-router";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-white w-[1290px] m-auto mt-[15px]">
            <div>
                <img src={logoImg} alt="Logo" />
            </div>
            <nav>
                <ul className="flex gap-4 items-center">
                    <NavLink to="/" className="font-[600] cursor-pointer">
                        Home
                    </NavLink>
                    <NavLink to="/blog" className="font-[600] cursor-pointer">
                        Blog
                    </NavLink>
                </ul>
            </nav>
            <div className="flex items-center gap-4">
                <CiSearch size={24} />
                <IoIosNotificationsOutline size={24} />
                <IoCartOutline size={24} />
                <button className="ml-[15px] bg-[#46A358] flex items-center text-[18px] text-white font-[600] px-3 py-1.5 rounded-[5px] cursor-pointer hover:bg-[#3b8a4a] transition duration-300 ease-in-out">
                    <IoLogInOutline size={24} />
                    Login
                </button>
            </div>
        </div>
    );
};

export default Navbar;
