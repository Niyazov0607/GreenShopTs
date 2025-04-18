import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage/homePage";
import NotFound from "../components/NotFounded";
import Navbar from "../components/Navbar/navbar";
import FooterHome from "../components/FooterHome/footer";
import Profile from "../pages/Profile/profile";
import Account from "../pages/Profile/Account/account";
import MyProduts from "../pages/Profile/MyProducts/myProduts";
import Address from "../pages/Profile/Address/address";
import Wishlist from "../pages/Profile/Wishlist/wishlist";
import Cart from "../pages/Cart/cart";
import Blog from "../pages/Blog/blog";
import Checkout from "../pages/Checkout/checkout";
import AboutCards from "@/pages/AboutCards/aboutCard";
import Track from "@/pages/Track/track";

const MainRouter = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
                <Route element={<Profile />} path="/profile">
                    <Route element={<Account />} path="account" />
                    <Route element={<MyProduts />} path="myProducts" />
                    <Route element={<Address />} path="address" />
                    <Route element={<Wishlist />} path="wishlist" />
                    <Route element={<Track />} path="track" />
                </Route>
                <Route path="/blog" element={<Blog />} />
                <Route path="/pages/cart" element={<Cart />} />
                <Route path="/pages/checkout" element={<Checkout />} />
                <Route element={<AboutCards />} path="/pages/aboutCard/:id" />
            </Routes>
            <FooterHome />
        </div>
    );
};

export default MainRouter;
