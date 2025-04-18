import React from "react";
import { useCart } from "../../Context/CartContext";
import { Flower } from "../../Types/type";
import { IoMdTrash } from "react-icons/io";
import { NavLink } from "react-router";

const Cart: React.FC = () => {
    const { cart, updateQuantity } = useCart();
    const { removeFromCart } = useCart();

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
    const total = subtotal;

    return (
        <div className="flex items-start m-auto justify-between w-[1290px]">
            <div className="w-[900px]">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

                {/* Headers */}
                <div className="grid grid-cols-4 font-semibold mb-2">
                    <p>Product</p>
                    <p className="text-center ml-[50px]">Price</p>
                    <p className="text-center">Quantity</p>
                    <p className="text-center">Total</p>
                </div>
                <hr className="mb-4 h-[1px] bg-[#46A35880] border-0" />

                {cart.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
                        {cart.map((item: Flower) => (
                            <div
                                key={item._id}
                                className="grid grid-cols-4 bg-gray-50 p-4 rounded-lg items-center relative "
                            >
                                <div className="flex gap-4 items-center ml-[-10px]">
                                    <img
                                        src={item.main_image}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h2 className="text-md font-semibold">
                                            {item.title}
                                        </h2>
                                        <span className="text-[15px] text-gray-600">
                                            SKU:{item._id}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-center text-gray-700 font-semibold items-center ml-[60px]">
                                    ${item.price}
                                </div>

                                <div className="flex items-center justify-center gap-2 ml-[50px]">
                                    <button
                                        className="px-3 py-1 rounded-full bg-[#46A358] text-white font-bold cursor-pointer"
                                        onClick={() => decreaseQuantity(item)}
                                    >
                                        -
                                    </button>
                                    <span className="w-6 text-center font-semibold">
                                        {item.quantity || 1}
                                    </span>
                                    <button
                                        className="px-3 py-1 rounded-full bg-[#46A358] text-white font-bold cursor-pointer"
                                        onClick={() => increaseQuantity(item)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-center text-gray-800 font-semibold ml-[60px]">
                                    $
                                    {(
                                        item.price * (item.quantity || 1)
                                    ).toFixed(2)}
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="absolute right-2 group cursor-pointer"
                                >
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Delete
                                    </span>
                                    <IoMdTrash size={20} />
                                </button>
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
                        <NavLink to="/pages/checkout">
                            Proceed To Checkout
                        </NavLink>
                    </button>
                </div>
                <div className="text-center mt-[10px]">
                    <button className="text-[#46A358] cursor-pointer">
                        <NavLink to="/">Continue Shopping</NavLink>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
