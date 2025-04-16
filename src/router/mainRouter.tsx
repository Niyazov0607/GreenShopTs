import React from "react";
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
                </Route>
                <Route path="/pages/cart" element={<Cart />} />
            </Routes>
            <FooterHome />
        </div>
    );
};

export default MainRouter;
