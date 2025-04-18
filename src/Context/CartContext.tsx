import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { Flower } from "../Types/type";

export type CartContextType = {
    cart: Flower[];
    toggleCart: (flower: Flower) => void;
    updateQuantity: (id: string, quantity: number) => void;
    isInCart: (id: string) => boolean;
    removeFromCart: (id: string) => void; // 👈 new function
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
                return prev.map((item) =>
                    item._id === flower._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { ...flower, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prev) =>
            prev.map((item) => (item._id === id ? { ...item, quantity } : item))
        );
    };

    const isInCart = (id: string): boolean => {
        return cart.some((item) => item._id === id);
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item._id !== id));
    };

    const clearCart = () => {
        setCart([]); // Clears the entire cart
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
