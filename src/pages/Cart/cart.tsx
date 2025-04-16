import React from "react";
import { useCart } from "../../Context/CartContext";
import { Flower } from "../../Types/type";
import { IoMdTrash } from "react-icons/io";

const Cart: React.FC = () => {
    const { cart, toggleCart, updateQuantity } = useCart();

    const increaseQuantity = (item: Flower): void => {
        updateQuantity(item._id, (item.quantity || 1) + 1);
    };

    const decreaseQuantity = (item: Flower): void => {
        if ((item.quantity || 1) > 1) {
            updateQuantity(item._id, (item.quantity || 1) - 1);
        }
    };

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
    );

    const shipping = 16;
    const total = subtotal + shipping;

    return (
        <div className="flex items-start m-auto justify-between w-[1290px]">
            {/* Left - Product List */}
            <div className="w-[782px]">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

                {/* Headers */}
                <div className="grid grid-cols-4 font-semibold mb-2">
                    <p>Product</p>
                    <p className="text-center">Price</p>
                    <p className="text-center">Quantity</p>
                    <p className="text-center">Total</p>
                </div>
                <hr className="mb-4 h-[1px] bg-[#46A35880] border-0" />

                {/* Cart Items */}
                {cart.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
                        {cart.map((item: Flower) => (
                            <div
                                key={item._id}
                                className="grid grid-cols-4 bg-gray-100 p-4 rounded-lg shadow-sm items-center"
                            >
                                {/* Product Image + Name + Delete */}
                                <div className="flex gap-4 relative">
                                    <img
                                        src={item.main_image}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h2 className="text-md font-semibold">
                                            {item.title}
                                        </h2>
                                        <p className="text-green-600 font-bold mt-1">
                                            ${item.price}
                                        </p>
                                        <p className="text-sm text-gray-400 line-through">
                                            ${item.discount_price}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => toggleCart(item)}
                                        className="absolute bottom-0 right-0 text-red-500 hover:text-red-700"
                                    >
                                        <IoMdTrash size={20} />
                                    </button>
                                </div>

                                {/* Price */}
                                <div className="text-center text-gray-700 font-semibold">
                                    ${item.price}
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        className="px-2 py-1 bg-gray-300 rounded"
                                        onClick={() => decreaseQuantity(item)}
                                    >
                                        -
                                    </button>
                                    <span className="w-6 text-center">
                                        {item.quantity || 1}
                                    </span>
                                    <button
                                        className="px-2 py-1 bg-gray-300 rounded"
                                        onClick={() => increaseQuantity(item)}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Total */}
                                <div className="text-center text-gray-800 font-semibold">
                                    $
                                    {(
                                        item.price * (item.quantity || 1)
                                    ).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right - Cart Summary */}
            <div className="w-[345px] mt-[55px]">
                <p className="text-[18px] font-[700]">Cart Total</p>
                <hr className="mt-[8px] mb-[10px] h-[1px] bg-[#46A35880] border-0" />

                {/* Coupon */}
                <p>Coupon Apply</p>
                <div className="relative mt-[10px]">
                    <input
                        className="outline-none border-2 border-[#46A358] rounded-[6px] py-[6px] pl-[9px] pr-[152px] w-full"
                        type="text"
                        placeholder="Enter coupon code here..."
                    />
                    <button className="bg-[#46A358] text-white py-[7px] px-[23px] absolute right-0 rounded-tr-[6px] rounded-br-[6px] cursor-pointer">
                        Apply
                    </button>
                </div>

                {/* Price Details */}
                <div className="py-[15px]">
                    <div className="flex items-center justify-between py-1">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between py-1">
                        <p>Coupon Discount</p>
                        <p>$0.00</p>
                    </div>
                    <div className="flex items-center justify-between py-1">
                        <p>Shipping</p>
                        <p>${shipping.toFixed(2)}</p>
                    </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between font-semibold text-lg">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                </div>

                {/* Buttons */}
                <div className="text-center mt-[20px]">
                    <button className="bg-[#46A358] py-[12px] px-[91px] rounded-[6px] text-white cursor-pointer">
                        Proceed To Checkout
                    </button>
                </div>
                <div className="text-center mt-[10px]">
                    <button className="text-[#46A358] cursor-pointer">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
