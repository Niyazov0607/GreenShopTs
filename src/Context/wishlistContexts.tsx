import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useRef,
} from "react";
import { notification } from "antd";
import { Flower } from "../Types/type";

type WishlistContextType = {
    wishlist: Flower[];
    toggleWishlist: (flower: Flower) => void;
    isInWishlist: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
    undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<Flower[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const recentlyToggledRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        const stored = localStorage.getItem("wishlist");
        if (stored) {
            try {
                const parsed: Flower[] = JSON.parse(stored);
                setWishlist(parsed);
            } catch (error) {
                console.error(
                    "Failed to parse wishlist from localStorage",
                    error
                );
            }
        }
    }, []);

    useEffect(() => {
        if (wishlist.length > 0) {
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
    }, [wishlist]);

    const toggleWishlist = (flower: Flower) => {
        const id = flower._id;
        if (recentlyToggledRef.current.has(id)) return;

        recentlyToggledRef.current.add(id);
        setTimeout(() => recentlyToggledRef.current.delete(id), 500);

        const exists = wishlist.some((item) => item._id === id);

        if (exists) {
            api.warning({
                message: "Removed from Wishlist",
                description: `"${flower.title}" has been removed.`,
            });
            setWishlist((prev) => prev.filter((item) => item._id !== id));
        } else {
            api.success({
                message: "Added to Wishlist",
                description: `"${flower.title}" has been added.`,
            });
            setWishlist((prev) => [...prev, flower]);
        }
    };

    const isInWishlist = (id: string) => {
        return wishlist.some((item) => item._id === id);
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, toggleWishlist, isInWishlist }}
        >
            {contextHolder}
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within WishlistProvider");
    }
    return context;
};
