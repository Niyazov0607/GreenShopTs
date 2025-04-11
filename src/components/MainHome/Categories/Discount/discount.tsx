import { memo } from "react";
import { Skeleton } from "antd";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const api = import.meta.env.VITE_API;

const fetchDiscount = async () => {
    const { data } = await axios.get(
        `${api}/features/discount?access_token=%3Cyour_access_token=64bebc1e2c6d3f056a8c85b7`
    );
    return data;
};

const Discount = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchDiscount,
    });

    if (isLoading)
        return (
            <div className="mt-[20px] bg-[#d9fae0] w-full h-[300px] flex flex-col items-center">
                <Skeleton.Input active size="large" className="w-[200px]" />
            </div>
        );

    return (
        <div className="mt-[20px] bg-[#d9fae0] w-full h-[300px] flex flex-col items-center">
            <h1 className="mt-[18px] text-[#46A358] text-4xl">
                <Skeleton.Input />
            </h1>
            <p className="mt-[11px] text-base font-bold">Discount</p>
            <img
                alt="discount"
                // src={}
                className="my-[10px] h-[180px]"
            />
        </div>
    );
};

export default memo(Discount);
