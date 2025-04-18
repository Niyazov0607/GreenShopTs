import React, { useState } from "react";
import { Modal } from "antd";
import { useCart } from "../../Context/CartContext";
import { NavLink } from "react-router";

interface Errors {
    [key: string]: string;
}

const Checkout: React.FC = () => {
    const { cart } = useCart();
    const [errors, setErrors] = useState<Errors>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
    );
    const shipping = 0;
    const total = subtotal + shipping;

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
        const fields = [
            "firstName",
            "lastName",
            "country",
            "city",
            "streetAddress",
            "state",
            "zip",
            "email",
            "phoneNumber",
        ];

        fields.forEach((field) => {
            const el = document.getElementById(field) as
                | HTMLInputElement
                | HTMLSelectElement
                | HTMLTextAreaElement
                | null;

            if (!el?.value) {
                newErrors[field] = "This field is required";
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsModalOpen(true);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex justify-between gap-10 w-[1290px] mx-auto mt-10">
                <form className="w-[800px]" onSubmit={handleSubmit}>
                    <h2 className="text-lg font-bold mb-6">Billing Address</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold text-sm">
                                * First name
                            </label>
                            <input
                                id="firstName"
                                className="w-full border p-2 rounded"
                                placeholder="Type your first name..."
                            />
                            {errors.firstName && (
                                <span className="text-red-500 text-sm">
                                    {errors.firstName}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="font-semibold text-sm">
                                * Last name
                            </label>
                            <input
                                id="lastName"
                                className="w-full border p-2 rounded"
                                placeholder="Type your last name..."
                            />
                            {errors.lastName && (
                                <span className="text-red-500 text-sm">
                                    {errors.lastName}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="font-semibold text-sm">
                                * Country / Region
                            </label>
                            <select
                                id="country"
                                className="w-full border p-2 rounded"
                            >
                                <option>Select your country...</option>
                            </select>
                            {errors.country && (
                                <span className="text-red-500 text-sm">
                                    {errors.country}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="font-semibold text-sm">
                                * Town / City
                            </label>
                            <input
                                id="city"
                                className="w-full border p-2 rounded"
                                placeholder="Select your town..."
                            />
                            {errors.city && (
                                <span className="text-red-500 text-sm">
                                    {errors.city}
                                </span>
                            )}
                        </div>
                        <div className="col-span-2 flex gap-4">
                            <div className="w-1/2">
                                <label className="font-semibold text-sm">
                                    * Street Address
                                </label>
                                <input
                                    id="streetAddress"
                                    className="w-full border p-2 rounded"
                                    placeholder="House number and street name"
                                />
                                {errors.streetAddress && (
                                    <span className="text-red-500 text-sm">
                                        {errors.streetAddress}
                                    </span>
                                )}
                            </div>
                            <div className="w-1/2 mt-[24px]">
                                <input
                                    className="w-full border p-2 rounded"
                                    placeholder="Appartment, suite, etc. (optional)"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">
                                * State
                            </label>
                            <select
                                id="state"
                                className="w-full border p-2 rounded"
                            >
                                <option>Select a state...</option>
                            </select>
                            {errors.state && (
                                <span className="text-red-500 text-sm">
                                    {errors.state}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="font-semibold text-sm">
                                * Zip
                            </label>
                            <input
                                id="zip"
                                className="w-full border p-2 rounded"
                                placeholder="Enter Zip code"
                            />
                            {errors.zip && (
                                <span className="text-red-500 text-sm">
                                    {errors.zip}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="font-semibold text-sm">
                                * Email address
                            </label>
                            <input
                                id="email"
                                className="w-full border p-2 rounded"
                                placeholder="Type your email..."
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="font-semibold text-sm">
                                * Phone Number
                            </label>
                            <div className="flex">
                                <span className="p-2 border rounded-l bg-gray-100">
                                    +998
                                </span>
                                <input
                                    id="phoneNumber"
                                    className="w-full border p-2 rounded-r"
                                    placeholder="Type your phone number..."
                                />
                            </div>
                            {errors.phoneNumber && (
                                <span className="text-red-500 text-sm">
                                    {errors.phoneNumber}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Payment method */}
                    <div className="mt-6">
                        <label className="font-semibold text-sm block mb-2">
                            * Payment Method
                        </label>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center border rounded p-2 gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    defaultChecked
                                />
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png"
                                    alt="paypal"
                                    className="h-6"
                                />
                                <span>PayPal, MasterCard, Visa, AmEx</span>
                            </label>
                            <label className="flex items-center border rounded p-2 gap-2 cursor-pointer">
                                <input type="radio" name="payment" />
                                Direct bank transfer
                            </label>
                            <label className="flex items-center border rounded p-2 gap-2 cursor-pointer">
                                <input type="radio" name="payment" />
                                Cash on delivery
                            </label>
                        </div>
                    </div>

                    {/* Order Notes */}
                    <div className="mt-6">
                        <label className="font-semibold text-sm block mb-2">
                            Order notes (optional)
                        </label>
                        <textarea
                            className="w-full border p-3 rounded min-h-[150px]"
                            placeholder="Your order notes, thoughts, feedback, etc..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-6 bg-green-600 text-white w-full py-3 rounded hover:bg-green-700 transition"
                    >
                        Place Order
                    </button>
                </form>

                <div className="w-[400px]">
                    <h2 className="text-lg font-bold mb-4">Your Order</h2>
                    <div className="bg-gray-50 p-4 rounded">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-center border-b py-3"
                            >
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={item.main_image}
                                        className="w-12 h-12 object-cover rounded"
                                        alt={item.title}
                                    />
                                    <div>
                                        <p className="font-semibold text-sm">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            SKU: {item._id}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-sm">
                                        (x {item.quantity || 1}) $
                                        {item.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Coupon Discount:</span>
                            <span>-$0.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-green-600 text-lg pt-2 border-t mt-2">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ant Design Modal */}
            <Modal
                title={
                    <div className="font-semibold text-lg">
                        Order Confirmation
                    </div>
                }
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={580}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-4 text-sm border-b pb-4">
                        <div>
                            <p className="text-gray-500">Order Number</p>
                            <p className="font-bold">{Date.now()}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Date</p>
                            <p className="font-bold">
                                {new Date().toDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500">Total</p>
                            <p className="font-bold">${total.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Payment Method</p>
                            <p className="font-bold">Cash on delivery</p>
                        </div>
                    </div>

                    {/* Order details */}
                    <div>
                        <h3 className="text-lg font-semibold border-b pb-1 mb-2">
                            Order Details
                        </h3>
                        <div className="space-y-3">
                            {cart.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.main_image}
                                            alt={item.title}
                                            className="w-14 h-14 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-semibold text-sm">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                SKU: {item._id}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">
                                            (x {item.quantity || 1})
                                        </p>
                                        <p className="text-sm font-semibold">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-4 text-right space-y-1">
                        <p>
                            <span className="text-gray-600">Shipping </span>
                            <span className="font-semibold text-green-600">
                                ${shipping.toFixed(2)}
                            </span>
                        </p>
                        <p className="text-lg font-bold text-green-600">
                            Total: ${total.toFixed(2)}
                        </p>
                    </div>

                    {/* Message */}
                    <p className="text-sm text-center text-gray-700 mt-4">
                        Your order is currently being processed. You will
                        receive an order confirmation email shortly with the
                        expected delivery date for your items.
                    </p>

                    {/* Track order button */}
                    <div className="text-center mt-4">
                        <NavLink to="/profile/track">
                            <button
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition cursor-pointer"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    console.log("Track order clicked");
                                }}
                            >
                                Track your order
                            </button>
                        </NavLink>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Checkout;
