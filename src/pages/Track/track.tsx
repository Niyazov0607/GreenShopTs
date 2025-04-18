import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TrackDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem("order");
        if (savedOrder) {
            const parsed = JSON.parse(savedOrder);
            if (parsed.id === id) {
                setOrder(parsed);
            }
        }
    }, [id]);

    if (!order) return <div className="p-6">Order not found.</div>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p className="mb-2">
                <strong>Order ID:</strong> {order.id}
            </p>
            <p className="mb-2">
                <strong>Date:</strong> {order.date}
            </p>
            <p className="mb-4">
                <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>

            <h3 className="font-medium mb-2">Ordered Products:</h3>
            <ul className="space-y-2">
                {order.items.map((item: any, index: number) => (
                    <li key={index} className="border p-3 rounded">
                        <div>
                            <strong>Name:</strong> {item.name}
                        </div>
                        <div>
                            <strong>Price:</strong> ${item.price.toFixed(2)}
                        </div>
                        <div>
                            <strong>Quantity:</strong> {item.quantity}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackDetails;
