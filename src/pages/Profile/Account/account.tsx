"use client";

import { useEffect, useState } from "react";

export default function Account() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        const storedUser = localStorage.getItem("user");

        if (storedUserData) {
            try {
                setUser(JSON.parse(storedUserData));
            } catch (error) {
                console.error("Error parsing userData:", error);
            }
        } else if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser.data && parsedUser.data.user) {
                    setUser(parsedUser.data.user);
                } else {
                    setUser(parsedUser);
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        setIsLoading(false);
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { id, value } = e.target;
        setUser({ ...user, [id]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        localStorage.setItem("userData", JSON.stringify(user));

        if (user.name) {
            localStorage.setItem("userName", user.name);
        }

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser.data && parsedUser.data.user) {
                    parsedUser.data.user = user;
                    localStorage.setItem("user", JSON.stringify(parsedUser));
                }
            } catch (error) {
                console.error("Error updating nested user data:", error);
            }
        }

        alert("Profile updated successfully!");
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-500">
                    No user data found. Please log in again.
                </p>
                <button
                    onClick={() => (window.location.href = "/")}
                    className="mt-4 bg-[#46A358] hover:bg-[#46A358]/80 text-white py-2 px-3 cursor-pointer rounded font-semibold"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-sm mt-[-30px]">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between gap-3 text-left">
                    <label className="w-full my-3">
                        <div className="text-sm font-semibold">
                            <span className="text-red-500 ">*</span> First Name
                        </div>
                        <input
                            className="w-full px-3 py-2 my-2 bg-white border rounded-lg"
                            type="text"
                            id="name"
                            value={user.name || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label className="w-full my-3">
                        <div className="text-sm font-semibold">
                            <span className="text-red-500 ">*</span> Last Name
                        </div>
                        <input
                            className="w-full px-3 py-2 my-2 bg-white border rounded-lg"
                            type="text"
                            id="surname"
                            value={user.surname || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="flex items-center justify-between gap-3 text-left">
                    <label className="w-full my-3">
                        <div className="text-sm font-semibold">
                            <span className="text-red-500 ">*</span> Email
                            Address
                        </div>
                        <input
                            className="w-full px-3 py-2 my-2 bg-white border rounded-lg"
                            type="email"
                            id="email"
                            value={user.email || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label className="w-full my-3">
                        <div className="text-sm font-semibold">
                            <span className="text-red-500 ">*</span> Phone
                        </div>

                        <div className="flex items-center w-full my-2 bg-white border rounded-lg outline-none group active:border-green-500 hover:border-green-500 transi focus:border-green-500">
                            <div className="bg-[#FBFBFB] py-2 group-hover:border-r-green-500 transi rounded-l-lg px-3 border-r-2 font-semibold">
                                +998
                            </div>
                            <input
                                className="w-full px-3 py-2 bg-white rounded-r-lg outline-none"
                                placeholder="phone number"
                                type="text"
                                id="phone_number"
                                value={user.phone_number || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    </label>
                </div>
                <div className="flex items-center justify-between gap-3 text-left">
                    <label className="w-full my-3">
                        <div className="text-sm font-semibold">
                            <span className="text-red-500 ">*</span> Username
                        </div>
                        <input
                            className="w-full px-3 py-2 my-2 bg-white border rounded-lg"
                            type="text"
                            id="username"
                            value={user.username || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label className="w-full my-3">
                        <div className="text-sm font-semibold">
                            <span className="text-red-500 "></span> Photo
                        </div>
                        <input
                            className="w-1/2 px-3 py-2 bg-white border rounded-lg my-2block"
                            type="file"
                            id="photo"
                        />
                    </label>
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="bg-[#46A358] hover:bg-[#46A358]/80 text-white py-2 px-4 cursor-pointer rounded font-semibold"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
