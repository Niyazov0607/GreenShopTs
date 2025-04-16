import React, { useState } from "react";
import { Heart, LogOut, MapPin, ShoppingBag, Truck, User } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { Modal } from "antd";

export default function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showLogoutModal = () => {
        setIsModalOpen(true);
    };

    const handleConfirmLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const handleCancelLogout = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-[1240px] mt-20 m-auto px-4 flex items-start justify-between ">
            <div className="w-[21%] rounded p-4 bg-[#FBFBFB]">
                <ul>
                    <li className="text-xl font-bold text-left">My Account</li>

                    <li className="py-1">
                        <NavLink
                            to="/profile/account"
                            className={({ isActive }) =>
                                `flex items-center gap-2 transition font-semibold px-2 py-1 my-2 text-lg ${
                                    isActive
                                        ? "text-[#46A358] border-l-4 border-[#46A358] cursor-not-allowed"
                                        : "border-l border-transparent "
                                } hover:text-[#46A358]`
                            }
                        >
                            <User /> Account Details
                        </NavLink>
                    </li>
                    <li className="py-1">
                        <NavLink
                            to="/profile/myProducts"
                            className={({ isActive }) =>
                                `flex items-center gap-2 transition font-semibold px-2 py-1 my-2 text-lg ${
                                    isActive
                                        ? "text-[#46A358] border-l-4 border-[#46A358] cursor-not-allowed"
                                        : "border-l border-transparent "
                                } hover:text-[#46A358]`
                            }
                        >
                            <ShoppingBag /> My Products
                        </NavLink>
                    </li>
                    <li className="py-1">
                        <NavLink
                            to="/profile/address"
                            className={({ isActive }) =>
                                `flex items-center gap-2 transition font-semibold px-2 py-1 my-2 text-lg ${
                                    isActive
                                        ? "text-[#46A358] border-l-4 border-[#46A358] cursor-not-allowed"
                                        : "border-l border-transparent "
                                } hover:text-[#46A358]`
                            }
                        >
                            <MapPin /> Address
                        </NavLink>
                    </li>
                    <li className="py-1">
                        <NavLink
                            to="/profile/wishlist"
                            className={({ isActive }) =>
                                `flex items-center gap-2 transition font-semibold px-2 py-1 my-2 text-lg ${
                                    isActive
                                        ? "text-[#46A358] border-l-4 border-[#46A358] cursor-not-allowed"
                                        : "border-l border-transparent "
                                } hover:text-[#46A358]`
                            }
                        >
                            <Heart /> Wishlist
                        </NavLink>
                    </li>
                    <li className="py-1">
                        <NavLink
                            to="/profile/track"
                            className={({ isActive }) =>
                                `flex items-center gap-2 transition font-semibold px-2 py-1 my-2 text-lg ${
                                    isActive
                                        ? "text-[#46A358] border-l-4 border-[#46A358] cursor-not-allowed"
                                        : "border-l border-transparent "
                                } hover:text-[#46A358]`
                            }
                        >
                            <Truck /> Track Order
                        </NavLink>
                    </li>

                    <hr className="my-5 border-none h-0.5 rounded bg-[#46A358]/30" />

                    <li
                        onClick={showLogoutModal}
                        className="flex items-center gap-2 px-2 py-1 my-2 text-lg font-semibold text-red-500 transition cursor-pointer"
                    >
                        <LogOut /> Logout
                    </li>
                </ul>
            </div>

            <div className="w-[74%]">
                <Outlet />
            </div>

            <Modal
                title="Confirm Logout"
                open={isModalOpen}
                onOk={handleConfirmLogout}
                onCancel={handleCancelLogout}
                okText="Yes, Logout"
                cancelText="Cancel"
                okButtonProps={{
                    style: {
                        backgroundColor: "red",
                        borderColor: "red",
                        color: "#fff",
                    },
                }}
                cancelButtonProps={{
                    style: {
                        color: "black",
                        borderColor: "black",
                    },
                }}
            >
                <p>Are you sure you want to logout?</p>
            </Modal>
        </div>
    );
}
