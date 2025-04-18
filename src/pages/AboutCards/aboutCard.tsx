import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const api = import.meta.env.VITE_API;

const fetchCard = async () => {
    const response = await axios.get(
        `${api}/flower/category/house-plants?access_token=67e51c1d2802b2864782f773`
    );
    return response.data.data;
};

const AboutCards = () => {
    const [activeStars, setActiveStars] = useState([
        false,
        false,
        false,
        false,
        false,
    ]);
    const { id } = useParams();
    const { data } = useQuery({
        queryKey: ["flowerCategory"],
        queryFn: fetchCard,
    });
    const handleStarClick = (index: number) => {
        const newActiveStars = [...activeStars];
        newActiveStars[index] = !newActiveStars[index];
        setActiveStars(newActiveStars);
    };
    if (data && Array.isArray(data)) {
        const dataId = data.find((item) => item._id === id);

        return (
            <>
                <div>
                    <div className="mt-3 w-[1290px] m-auto">
                        <div className="mt-[43px]">
                            <div className="flex w-full gap-12 max-lg:flex-col">
                                <div className="flex flex-1 gap-6 max-lg:flex-col">
                                    <div className="flex flex-col justify-between max-lg:order-2 max-lg:flex-row max-lg:gap-3 max-lg:overflow-x-scroll ">
                                        <div className="w-[100px] h-[100px] bg-[#e5e5e5] cursor-pointer border-2 hover:border-[#46A358] transition-colors">
                                            <img
                                                className="w-full h-full"
                                                src={dataId?.detailed_images[0]}
                                                alt=""
                                            />
                                        </div>
                                        <div className="w-[100px] h-[100px] bg-[#e5e5e5] cursor-pointer border-2 hover:border-[#46A358] transition-colors">
                                            <img
                                                className="w-full h-full"
                                                src={dataId?.detailed_images[1]}
                                                alt=""
                                            />
                                        </div>
                                        <div className="w-[100px] h-[100px] bg-[#e5e5e5] cursor-pointer border-2 hover:border-[#46A358] transition-colors">
                                            <img
                                                className="w-full h-full"
                                                src={dataId?.detailed_images[2]}
                                                alt=""
                                            />
                                        </div>
                                        <div className="w-[100px] h-[100px] bg-[#e5e5e5] cursor-pointer border-2 hover:border-[#46A358] transition-colors">
                                            <img
                                                className="w-full h-full"
                                                src={dataId?.detailed_images[3]}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center w-full cursor-pointer">
                                        <div className="ant-image css-k7429z">
                                            <img
                                                className="w-full h-full ant-image-img"
                                                src={dataId?.main_image}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-4">
                                            <img
                                                className="rounded-full w-[50px] h-[50px] cursor-pointer"
                                                src="https://alqadir.edu.pk/wp-content/uploads/2022/09/BS-Islamic-Studies-2022.jpg"
                                                alt="Islom"
                                            />
                                            <div>
                                                <div>
                                                    <h1 className="font-bold text-[28px]">
                                                        {dataId?.title}
                                                    </h1>

                                                    <h3 className="font-bold text-[#46A358] text-[22px]">
                                                        {dataId?.discount_price ? (
                                                            <>
                                                                $
                                                                {
                                                                    dataId?.discount_price
                                                                }
                                                                <span className="font-thin text-[#A5A5A5] ml-[5px] line-through">
                                                                    $
                                                                    {
                                                                        dataId?.price
                                                                    }
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>${dataId.price}</>
                                                        )}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-center items-center font-light text-[12px]">
                                            <ul className="flex">
                                                {activeStars.map(
                                                    (isActive, index) => (
                                                        <li
                                                            key={index}
                                                            className="mr-2"
                                                        >
                                                            <span
                                                                role="img"
                                                                aria-label="star"
                                                                className="flex items-center"
                                                                onClick={() =>
                                                                    handleStarClick(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <svg
                                                                    viewBox="64 64 896 896"
                                                                    focusable="false"
                                                                    data-icon="star"
                                                                    width="1em"
                                                                    height="1em"
                                                                    fill={
                                                                        isActive
                                                                            ? "#fadb14"
                                                                            : "currentColor"
                                                                    }
                                                                    aria-hidden="true"
                                                                    className="w-[20px] h-[20px] text-zinc-100"
                                                                >
                                                                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                                                                </svg>
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>

                                            <p>0 Customer Review</p>
                                        </div>
                                    </div>
                                    <div className="border border-[#46A35880] mt-[12px]"></div>
                                    <div className="mt-[12px]">
                                        <h3 className="font-medium text-[20px]">
                                            Short Description:
                                        </h3>
                                        <p className="font-light mt-[10px] text-start">
                                            {dataId?.short_description}
                                        </p>
                                    </div>
                                    <div className="mt-[12px]">
                                        <h3 className="font-medium text-[20px]">
                                            Size:
                                        </h3>
                                        <div className="flex flex-col gap-3 mt-[12px]">
                                            <div className="flex gap-3">
                                                <button className="w-[28px] h-[28px] border border-[#EAEAEA] rounded-full hover:border-[#46A358] hover:text-[#46A358] transition-colors">
                                                    S
                                                </button>
                                                <button className="w-[28px] h-[28px] border border-[#EAEAEA] rounded-full hover:border-[#46A358] hover:text-[#46A358] transition-colors">
                                                    M
                                                </button>
                                                <button className="w-[28px] h-[28px] border border-[#EAEAEA] rounded-full hover:border-[#46A358] hover:text-[#46A358] transition-colors">
                                                    L
                                                </button>
                                                <button className="w-[28px] h-[28px] border border-[#EAEAEA] rounded-full hover:border-[#46A358] hover:text-[#46A358] transition-colors">
                                                    XL
                                                </button>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="w-[35px] h-[35px] bg-[#46A358] rounded-full text-white">
                                                    -
                                                </button>
                                                <h3 className="font-medium text-[20px]">
                                                    0
                                                </h3>
                                                <button className="w-[35px] h-[35px] bg-[#46A358] rounded-full text-white">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex mt-[10px] gap-3">
                                        <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-[130px] h-[40px]">
                                            BUY NOW
                                        </button>
                                        <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-[130px] h-[40px] border border-[#46A358] bg-transparent">
                                            <p className="text-black">
                                                ADD TO CARD
                                            </p>
                                        </button>

                                        <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-[40px] h-[40px] bg-transparent border border-[#46A358] text-[20px] ">
                                            <span
                                                role="img"
                                                aria-label="heart"
                                                className="anticon anticon-heart text-[#000]"
                                            >
                                                <svg
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="heart"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="ant-descriptions mt-[12px] css-k7429z">
                                        <div className="ant-descriptions-view">
                                            <table>
                                                <tbody>
                                                    <tr className="ant-descriptions-row">
                                                        <td className="ant-descriptions-item">
                                                            <div className="ant-descriptions-item-container">
                                                                <span className="font-bold">
                                                                    SKU
                                                                </span>
                                                                <span className="ant-descriptions-item-content">
                                                                    {
                                                                        dataId?._id
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="ant-descriptions-row">
                                                        <td className="text-start">
                                                            <div className="ant-descriptions-item-container">
                                                                <span className="text-start">
                                                                    Categories
                                                                </span>
                                                                <span className="ant-descriptions-item-content">
                                                                    {
                                                                        dataId?.category
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="ant-descriptions-row">
                                                        <td className="text-start">
                                                            <div className="ant-descriptions-item-container">
                                                                <span className="ant-descriptions-item-label">
                                                                    Tags
                                                                </span>
                                                                <span className="ant-descriptions-item-content">
                                                                    Home,
                                                                    Garden,
                                                                    Plants
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[92px]">
                                <div className="flex gap-5 border-b border-[#46A358] pb-[5px]">
                                    <h3 className="cursor-pointer hover:text-[#46A358] text-[#46A358]">
                                        Product Description
                                    </h3>
                                    <h3 className="cursor-pointer hover:text-[#46A358] false">
                                        Reviews (0)
                                    </h3>
                                </div>
                                <div className="font-light text-start text-[15px] leading-8 mb-[30px]">
                                    <h2>{dataId?.description}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="my-[120px]">
                            <h3 className="font-bold text-[#46A358] border-b border-[#46A35880] pb-[5px]">
                                Related Products
                            </h3>
                            <div className="mt-[30px] grid grid-cols-5 gap-4 max-xl:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
                                <div>
                                    <div className="bg-[#FBFBFB] h-[255px] flex justify-center items-center">
                                        <img src="" alt="" />
                                    </div>
                                    <h3 className="font-medium">
                                        Beach Spider Lily
                                    </h3>
                                    <p className="font-bold text-[#46A358]">
                                        $129.00
                                    </p>
                                </div>
                                <div>
                                    <div className="bg-[#FBFBFB] h-[255px] flex justify-center items-center">
                                        <img src="" alt="" />
                                    </div>
                                    <h3 className="font-medium">
                                        Beach Spider Lily
                                    </h3>
                                    <p className="font-bold text-[#46A358]">
                                        $129.00
                                    </p>
                                </div>
                                <div>
                                    <div className="bg-[#FBFBFB] h-[255px] flex justify-center items-center">
                                        <img src="" alt="" />
                                    </div>
                                    <h3 className="font-medium">
                                        Beach Spider Lily
                                    </h3>
                                    <p className="font-bold text-[#46A358]">
                                        $129.00
                                    </p>
                                </div>
                                <div>
                                    <div className="bg-[#FBFBFB] h-[255px] flex justify-center items-center">
                                        <img src="" alt="" />
                                    </div>
                                    <h3 className="font-medium">
                                        Beach Spider Lily
                                    </h3>
                                    <p className="font-bold text-[#46A358]">
                                        $129.00
                                    </p>
                                </div>
                                <div>
                                    <div className="bg-[#FBFBFB] h-[255px] flex justify-center items-center">
                                        <img src="" alt="" />
                                    </div>
                                    <h3 className="font-medium">
                                        Beach Spider Lily
                                    </h3>
                                    <p className="font-bold text-[#46A358]">
                                        $129.00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ;
                </div>
            </>
        );
    }
};

export default AboutCards;
