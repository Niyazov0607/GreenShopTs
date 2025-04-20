"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
    title: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    createdAt: string;
    extra_shop_info: {
        total_price: number;
    };
    products: Product[];
}

const TrackOrderPage: React.FC = () => {
    const api = import.meta.env.VITE_API;
    const token =
        localStorage.getItem("access_token") || "67e4e24624236cc35fd2032d";

    const fetchOrders = async (): Promise<Order[]> => {
        try {
            const response = await axios.get(
                `${api}/order/get-order?access_token=${token}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (Array.isArray(response.data)) {
                return response.data;
            } else if (
                response.data.orders &&
                Array.isArray(response.data.orders)
            ) {
                return response.data.orders;
            } else if (
                response.data.data &&
                Array.isArray(response.data.data)
            ) {
                return response.data.data;
            }

            console.error("Unexpected response structure:", response.data);
            return [];
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    };

    const {
        data: orders,
        isLoading,
        error,
    } = useQuery<Order[]>({
        queryKey: ["user-orders"],
        queryFn: fetchOrders,
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Track your Orders</h1>

            {isLoading ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-green-500 border-r-transparent"></div>
                    <p className="mt-2">Loading orders...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                    <p>Failed to load orders. Please try again.</p>
                    <p className="text-sm mt-2">
                        Error: {(error as Error).message}
                    </p>
                </div>
            ) : !orders || orders.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">
                        You don't have any orders yet.
                    </p>
                    <Link
                        to="/"
                        className="mt-4 inline-block text-green-600 hover:underline"
                    >
                        Continue shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="border rounded-lg overflow-hidden p-4"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <div className="text-sm text-gray-500">
                                        Order Number
                                    </div>
                                    <div className="font-bold">{order._id}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">
                                        Order Date
                                    </div>
                                    <div>{formatDate(order.createdAt)}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">
                                        Total
                                    </div>
                                    <div className="font-bold">
                                        $
                                        {order.extra_shop_info?.total_price?.toFixed(
                                            2
                                        ) || "N/A"}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">
                                        More
                                    </div>
                                    <Link
                                        to={`/profile/track/${order._id}`}
                                        className="text-green-600 hover:underline"
                                    >
                                        Get details
                                    </Link>
                                </div>
                            </div>

                            {/* Display ordered products with individual order date */}
                            {order.products && order.products.length > 0 ? (
                                <div className="mt-4">
                                    <h3 className="text-sm text-gray-600 mb-2">
                                        Ordered Products
                                    </h3>
                                    <ul className="space-y-2">
                                        {order.products.map((product, i) => (
                                            <li
                                                key={i}
                                                className="flex justify-between border-b pb-2"
                                            >
                                                <div>
                                                    <div>{product.title}</div>
                                                    <div className="text-xs text-gray-500">
                                                        Ordered on:{" "}
                                                        {formatDate(
                                                            order.createdAt
                                                        )}
                                                    </div>
                                                </div>
                                                <span>
                                                    {product.quantity} × $
                                                    {product.price?.toFixed(
                                                        2
                                                    ) || "0.00"}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="mt-4 text-sm text-gray-500">
                                    No product details available
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrackOrderPage;
