import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { Flower } from "../Types/type";
import { notification } from "antd";

export type CartContextType = {
    cart: Flower[];
    toggleCart: (flower: Flower) => void;
    updateQuantity: (id: string, quantity: number) => void;
    isInCart: (id: string) => boolean;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [cart, setCart] = useState<Flower[]>(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const toggleCart = (flower: Flower) => {
        setCart((prev) => {
            const exists = prev.find((item) => item._id === flower._id);
            if (exists) {
                const updatedCart = prev.map((item) =>
                    item._id === flower._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                // Show notification when item is added to cart
                notification.success({
                    message: `${flower.title} Added to Cart`,
                    description: `You have added ${flower.title} to your cart.`,
                    placement: "topRight",
                });
                return updatedCart;
            } else {
                const updatedCart = [...prev, { ...flower, quantity: 1 }];
                // Show notification when new item is added to cart
                notification.success({
                    message: `${flower.title} Added to Cart`,
                    description: `${flower.title} is now in your cart.`,
                    placement: "topRight",
                });
                return updatedCart;
            }
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item._id === id) {
                    // Show notification when quantity is updated
                    notification.info({
                        message: `${item.title} Quantity Updated`,
                        description: `Quantity of ${item.title} has been updated to ${quantity}.`,
                        placement: "topRight",
                    });
                    return { ...item, quantity };
                }
                return item;
            })
        );
    };

    const isInCart = (id: string): boolean => {
        return cart.some((item) => item._id === id);
    };

    const removeFromCart = (id: string) => {
        const removedItem = cart.find((item) => item._id === id);
        setCart((prev) => {
            const updatedCart = prev.filter((item) => item._id !== id);
            // Show notification when an item is removed
            if (removedItem) {
                notification.warning({
                    message: `${removedItem.title} Removed from Cart`,
                    description: `${removedItem.title} has been removed from your cart.`,
                    placement: "topRight",
                });
            }
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]); // Clears the entire cart
        // Show notification when the cart is cleared
        notification.info({
            message: "Cart Cleared",
            description: "Your cart has been cleared.",
            placement: "topRight",
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                toggleCart,
                updateQuantity,
                isInCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
};
