"use client";

import type React from "react";
import { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "@/Context/CartContext";

interface Errors {
    [key: string]: string;
}

const Checkout: React.FC = () => {
    const api = import.meta.env.VITE_API;
    const navigate = useNavigate();

    // Use the existing cart context with the Flower type
    const { cart, clearCart } = useCart();
    const [errors, setErrors] = useState<Errors>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [orderError, setOrderError] = useState("");
    const [orderId, setOrderId] = useState<string>("");
    const [orderPlaced, setOrderPlaced] = useState(false);

    const subtotal = cart.reduce(
        (acc: any, item: any) => acc + item.price * (item.quantity || 1),
        0
    );
    const shipping = 16;
    const total = subtotal + shipping;

    const makeOrder = async () => {
        setIsLoading(true);
        setOrderError("");

        // Get form values
        const firstName = (
            document.getElementById("firstName") as HTMLInputElement
        )?.value;
        const lastName = (
            document.getElementById("lastName") as HTMLInputElement
        )?.value;
        const country = (
            document.getElementById("country") as HTMLSelectElement
        )?.value;
        const city = (document.getElementById("city") as HTMLInputElement)
            ?.value;
        const streetAddress = (
            document.getElementById("streetAddress") as HTMLInputElement
        )?.value;
        const additionalAddress = (
            document.getElementById("additionalAddress") as HTMLInputElement
        )?.value;
        const state = (document.getElementById("state") as HTMLSelectElement)
            ?.value;
        const zip = (document.getElementById("zip") as HTMLInputElement)?.value;
        const email = (document.getElementById("email") as HTMLInputElement)
            ?.value;
        const phoneNumber = (
            document.getElementById("phoneNumber") as HTMLInputElement
        )?.value;
        const orderNotes =
            (document.getElementById("orderNotes") as HTMLTextAreaElement)
                ?.value || "";

        // Get selected payment method
        const paymentMethod =
            document
                .querySelector('input[name="payment"]:checked')
                ?.getAttribute("data-method") || "cash-on-delivery";

        try {
            // Get the token from localStorage or use the provided one
            const token =
                localStorage.getItem("access_token") ||
                "67e4e24624236cc35fd2032d";

            // Format the request exactly as expected by the API
            const { data } = await axios.post(
                `${api}/order/make-order?access_token=${token}`,
                {
                    billing_address: {
                        first_name: firstName,
                        last_name: lastName,
                        country: country,
                        town: city,
                        street_address: streetAddress,
                        additional_street_address: additionalAddress,
                        state: state,
                        zip: zip,
                        email: email,
                        phone_number: phoneNumber,
                        order_notes: orderNotes,
                        payment_method: paymentMethod,
                    },
                    extra_shop_info: {
                        total_price: total,
                        coupon: {
                            has_coupon: false,
                            discount_for: 0,
                        },
                    },
                    shop_list: cart.map((item: any) => ({
                        _id: item._id,
                        title: item.title,
                        price: item.price,
                        discount: item.discount_price ? true : false,
                        discount_price: item.discount_price || item.price,
                        quantity: item.quantity || 1,
                    })),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    timeout: 15000,
                }
            );

            setIsLoading(false);
            setOrderId(data.orderId || Date.now().toString());
            setOrderPlaced(true); // Mark that order was placed successfully
            return data;
        } catch (error) {
            setIsLoading(false);
            console.error("Error making order:", error);

            // Extract error message from axios error
            let errorMessage = "Failed to make order";
            if (axios.isAxiosError(error)) {
                if (error.code === "ECONNABORTED") {
                    errorMessage = "Request timed out. Please try again.";
                } else {
                    errorMessage =
                        error.response?.data?.message ||
                        error.message ||
                        errorMessage;
                }

                // Log detailed error information for debugging
                console.log("Status:", error.response?.status);
                console.log("Response data:", error.response?.data);
                console.log("Request config:", error.config);
            }

            setOrderError(errorMessage);
            throw new Error(errorMessage);
        }
    };

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

        // Add email validation
        const emailEl = document.getElementById("email") as HTMLInputElement;
        if (emailEl?.value && !/\S+@\S+\.\S+/.test(emailEl.value)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await makeOrder();
            console.log("Order placed successfully", response);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error placing the order", error);
            setIsModalOpen(true); // Show modal with error
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setOrderError("");
    };

    // Handle track order button click
    const handleTrackOrder = () => {
        setIsModalOpen(false);

        // Clear the cart if order was placed successfully
        if (orderPlaced) {
            clearCart(); // This will use your existing clearCart function that shows a notification
        }

        // Navigate to track page
        navigate("/profile/track");
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between gap-10 w-full max-w-[1290px] mx-auto mt-10 px-4">
                <form className="w-full lg:w-[800px]" onSubmit={handleSubmit}>
                    <h2 className="text-lg font-bold mb-6">Billing Address</h2>

                    {/* Billing Address Fields... */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold text-sm">
                                * First name
                            </label>
                            <input
                                id="firstName"
                                className={`w-full border p-2 rounded ${
                                    errors.firstName ? "border-red-500" : ""
                                }`}
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
                                className={`w-full border p-2 rounded ${
                                    errors.lastName ? "border-red-500" : ""
                                }`}
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
                                className={`w-full border p-2 rounded ${
                                    errors.country ? "border-red-500" : ""
                                }`}
                            >
                                <option value="">Select your country...</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="UK">United Kingdom</option>
                                <option value="AU">Australia</option>
                                <option value="Iceland">Iceland</option>
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
                                className={`w-full border p-2 rounded ${
                                    errors.city ? "border-red-500" : ""
                                }`}
                                placeholder="Select your town..."
                            />
                            {errors.city && (
                                <span className="text-red-500 text-sm">
                                    {errors.city}
                                </span>
                            )}
                        </div>
                        <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/2">
                                <label className="font-semibold text-sm">
                                    * Street Address
                                </label>
                                <input
                                    id="streetAddress"
                                    className={`w-full border p-2 rounded ${
                                        errors.streetAddress
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    placeholder="House number and street name"
                                />
                                {errors.streetAddress && (
                                    <span className="text-red-500 text-sm">
                                        {errors.streetAddress}
                                    </span>
                                )}
                            </div>
                            <div className="w-full md:w-1/2 md:mt-[24px]">
                                <input
                                    id="additionalAddress"
                                    className="w-full border p-2 rounded"
                                    placeholder="Apartment, suite, etc. (optional)"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">
                                * State
                            </label>
                            <select
                                id="state"
                                className={`w-full border p-2 rounded ${
                                    errors.state ? "border-red-500" : ""
                                }`}
                            >
                                <option value="">Select a state...</option>
                                <option value="NY">New York</option>
                                <option value="CA">California</option>
                                <option value="TX">Texas</option>
                                <option value="FL">Florida</option>
                                <option value="Wisconsin">Wisconsin</option>
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
                                className={`w-full border p-2 rounded ${
                                    errors.zip ? "border-red-500" : ""
                                }`}
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
                                type="email"
                                className={`w-full border p-2 rounded ${
                                    errors.email ? "border-red-500" : ""
                                }`}
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
                                    className={`w-full border p-2 rounded-r ${
                                        errors.phoneNumber
                                            ? "border-red-500"
                                            : ""
                                    }`}
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
                                    data-method="card"
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
                                <input
                                    type="radio"
                                    name="payment"
                                    data-method="bank-transfer"
                                />
                                Direct bank transfer
                            </label>
                            <label className="flex items-center border rounded p-2 gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    data-method="cash-on-delivery"
                                />
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
                            id="orderNotes"
                            className="w-full border p-3 rounded min-h-[150px]"
                            placeholder="Your order notes, thoughts, feedback, etc..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-6 bg-green-600 text-white w-full py-3 rounded hover:bg-green-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Place Order"}
                    </button>
                </form>

                {/* Order Summary */}
                <div className="w-full lg:w-[400px]">
                    <h2 className="text-lg font-bold mb-4">Your Order</h2>
                    <div className="bg-gray-50 p-4 rounded">
                        {cart.map((item: any) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-center border-b py-3"
                            >
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={
                                            item.main_image ||
                                            "/placeholder.svg"
                                        }
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
                        {orderError ? "Order Error" : "Order Confirmation"}
                    </div>
                }
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={580}
            >
                {orderError ? (
                    <div className="space-y-4">
                        <div className="text-red-500 p-4 bg-red-50 rounded">
                            <p className="font-semibold">
                                Error processing your order:
                            </p>
                            <p>{orderError}</p>
                        </div>
                        <div className="text-center mt-4">
                            <button
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                                onClick={handleCancel}
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 text-sm border-b pb-4">
                            <div>
                                <p className="text-gray-500">Order Number</p>
                                <p className="font-bold">
                                    {orderId || Date.now()}
                                </p>
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
                                <p className="font-bold">
                                    {document
                                        .querySelector(
                                            'input[name="payment"]:checked'
                                        )
                                        ?.getAttribute("data-method") === "card"
                                        ? "Credit Card/PayPal"
                                        : document
                                              .querySelector(
                                                  'input[name="payment"]:checked'
                                              )
                                              ?.getAttribute("data-method") ===
                                          "bank-transfer"
                                        ? "Bank Transfer"
                                        : "Cash on Delivery"}
                                </p>
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
                                                src={
                                                    item.main_image ||
                                                    "/placeholder.svg"
                                                }
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
                            <button
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition cursor-pointer"
                                onClick={handleTrackOrder}
                            >
                                Track your order
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default Checkout;
