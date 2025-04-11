import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, Slider } from "antd";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Discount from "./Discount/discount";

const api = import.meta.env.VITE_API;

const fetchCategories = async () => {
    const { data } = await axios.get(
        `${api}/flower/category?access_token=64bebc1e2c6d3f056a8c85b7`
    );
    return data;
};

const Categories = () => {
    const [price, setPrice] = useState([0, 1000]);
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const category = searchParams.get("category") || "house-plats";

    const updateSort = (sortType: string) => {
        searchParams.set("category", sortType);
        setSearchParams(searchParams);
    };

    const handleFilterApply = () => {
        searchParams.set("range_min", price[0].toString());
        searchParams.set("range_max", price[1].toString());
        setSearchParams(searchParams);
    };

    if (isLoading)
        return (
            <div className="w-[250px]">
                <Skeleton active paragraph={{ rows: 9, width: ["100%"] }} />
            </div>
        );

    if (error instanceof Error)
        return <p>Xatolik yuz berdi: {error.message}</p>;

    return (
        <>
            <div className="w-[250px] bg-[#F5F5F580] p-[15px]">
                <h3 className="font-bold text-left ml-[12px]">Categories</h3>
                <div className="flex flex-col gap-2 mt-[10px] pl-[10px] cursor-pointer">
                    {data?.data?.map(
                        (
                            {
                                title,
                                count,
                                route_path,
                            }: {
                                title: string;
                                count: number;
                                route_path: string;
                            },
                            index: number
                        ) => (
                            <div
                                key={index}
                                onClick={() => updateSort(route_path)}
                                className={`flex justify-between cursor-pointer hover:text-green-600 ${
                                    category === route_path
                                        ? "text-green-600"
                                        : ""
                                }`}
                            >
                                <h3>{title}</h3>
                                <h3>{count}</h3>
                            </div>
                        )
                    )}
                </div>

                <div className="mt-[15px] ">
                    <h3 className="font-bold">Price Range</h3>
                    <Slider
                        range
                        defaultValue={[0, 1000]}
                        max={1000}
                        onChange={(value) => setPrice(value)}
                    />
                    <p className="font-normal text-left">
                        Price:{" "}
                        <span className="font-bold text-[#46A358]">
                            ${price[0]} - ${price[1]}
                        </span>
                    </p>
                    <button
                        className="mt-[16px] bg-[#46A358] text-white px-[23px] py-[8px] rounded-lg font-bold mr-[200px] cursor-pointer hover:bg-[#46A358]/70 transition duration-300 ease-in-out"
                        onClick={handleFilterApply}
                    >
                        Filter
                    </button>
                </div>

                <Discount />
            </div>
        </>
    );
};

export default Categories;
