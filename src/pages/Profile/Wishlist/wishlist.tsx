import React from "react";
import { useWishlist } from "../../../Context/WishlistContext";
import { Flower } from "../../../Types/type";

const Wishlist = () => {
    const { wishlist } = useWishlist();

    if (wishlist.length === 0) return <p>Your wishlist is empty.</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
            <div className="grid grid-cols-3 gap-4">
                {wishlist.map((item: Flower) => (
                    <div key={item._id} className="bg-gray-100 p-4 rounded">
                        <img
                            src={item.main_image}
                            alt={item.title}
                            className="w-full h-40 object-contain"
                        />
                        <h3 className="mt-2">{item.title}</h3>
                        <p className="text-[#46A358] font-bold">
                            ${item.price}
                        </p>
                        <p className="line-through text-sm text-gray-400">
                            ${item.discount_price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
