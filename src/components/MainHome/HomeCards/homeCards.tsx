import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../../Context/WishlistContext";
import { useCart } from "../../../Context/CartContext";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const api = import.meta.env.VITE_API;

const fetchFlowers = async ({ queryKey }: { queryKey: string[] }) => {
    const [_key, category, type] = queryKey;
    const { data } = await axios.get(
        `${api}/flower/category/${category}?type=${type}&access_token=64bebc1e2c6d3f056a8c85b7`
    );
    return data;
};

function HomeCards() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category") || "house-plants";
    const type = searchParams.get("type") || "all-plants";
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { toggleCart, isInCart, cart } = useCart();

    const { data, isLoading, error } = useQuery({
        queryKey: ["flower", category, type],
        queryFn: ({ queryKey }) => fetchFlowers({ queryKey }),
    });

    const updateType = (newType: string) => {
        searchParams.set("type", newType);
        setSearchParams(searchParams);
    };

    if (isLoading) {
        return (
            <div className="w-[900px] ml-[30px]">
                <div className="grid grid-cols-3 gap-4 mt-[30px]">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse bg-gray-200 h-[300px]"
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <div className="w-[970px] pl-[30px]">
            <div className="flex justify-between">
                <div className="gap-8 p-[5px] max-sm:gap-4 flex text-base font-normal cursor-pointer">
                    <h3
                        onClick={() => updateType("all-plants")}
                        className="cursor-pointer hover:text-[#46A358]"
                    >
                        All Plants
                    </h3>
                    <h3
                        onClick={() => updateType("new-arrivals")}
                        className="cursor-pointer hover:text-[#46A358]"
                    >
                        New Arrivals
                    </h3>
                    <h3
                        onClick={() => updateType("sale")}
                        className="cursor-pointer hover:text-[#46A358]"
                    >
                        Sale
                    </h3>
                </div>
                <div className="flex">
                    <p>Sort by:</p>
                    <select
                        className="ml-2 border border-gray-300 rounded"
                        onChange={(e) => updateType(e.target.value)}
                    >
                        <option value="default">Default Sorting</option>
                        <option value="the-cheapest">The Cheapest</option>
                        <option value="most-expensive">Most Expensive</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 my-[30px]">
                {data?.data?.map(
                    (
                        {
                            title,
                            price,
                            discount_price,
                            main_image,
                            _id,
                        }: {
                            title: string;
                            price: number;
                            discount_price: number;
                            main_image: string;
                            _id: string;
                        },
                        index: number
                    ) => {
                        const product = {
                            _id,
                            title,
                            price,
                            discount_price,
                            main_image,
                        };

                        const cartItem = cart.find(
                            (item) => item._id === product._id
                        );
                        const quantity = cartItem?.quantity ?? 0;

                        return (
                            <div key={index}>
                                <div className="group h-[300px] bg-[#f5f5f5] flex justify-center items-center relative">
                                    <div className="bg-[#46A358] text-white absolute top-3 left-0 px-[5px] py-[3px]">
                                        13% OFF
                                    </div>
                                    <img
                                        className="w-4/6"
                                        src={main_image}
                                        alt="img"
                                    />
                                    <div className="absolute inset-x-auto hidden gap-4 bottom-2 group-hover:flex">
                                        <div className="relative">
                                            {quantity > 0 && (
                                                <span className=" bg-green rounded-full w-[18px] h-[18px] flex justify-center items-center">
                                                    {quantity}
                                                </span>
                                            )}
                                        </div>

                                        <div
                                            className="bg-white w-[35px] h-[35px] flex rounded-lg justify-center items-center cursor-pointer text-[20px]"
                                            onClick={() => toggleCart(product)}
                                        >
                                            <IoCartOutline />
                                        </div>

                                        <div
                                            className="bg-white w-[35px] h-[35px] flex rounded-lg justify-center items-center cursor-pointer text-[20px]"
                                            onClick={() =>
                                                toggleWishlist(product)
                                            }
                                        >
                                            {isInWishlist(_id) ? (
                                                <FaHeart
                                                    size={20}
                                                    color="red"
                                                />
                                            ) : (
                                                <FaRegHeart size={20} />
                                            )}
                                        </div>

                                        <div className="bg-white w-[35px] h-[35px] flex rounded-lg justify-center items-center text-[20px] cursor-pointer">
                                            <Link
                                                to={`/pages/aboutCards/${_id}`}
                                            >
                                                <CiSearch size={24} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-normal text-start cursor-pointer mt-[12px]">
                                    {title}
                                </h3>
                                <p className="text-[#46A358] text-start font-bold">
                                    ${price}
                                    <span className="font-thin text-[#A5A5A5] ml-[5px] line-through">
                                        ${discount_price}
                                    </span>
                                </p>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}

export default HomeCards;
