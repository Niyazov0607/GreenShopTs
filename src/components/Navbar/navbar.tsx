import React from "react";
import logoImg from "../../assets/logogreen.svg";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoCartOutline, IoLogInOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import { Auth } from "../Auth/auth";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-white w-[1290px] m-auto mt-[15px]">
            <div>
                <NavLink to="/">
                    <img src={logoImg} alt="Logo" />
                </NavLink>
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

                <Auth />
            </div>
        </div>
    );
};

export default Navbar;
