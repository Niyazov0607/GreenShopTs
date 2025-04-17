import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WishlistProvider } from "./Context/wishlistContexts.tsx";
import { CartProvider } from "./Context/CartContext.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <WishlistProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </WishlistProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
);
