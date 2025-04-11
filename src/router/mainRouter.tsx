import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage/homePage";
import NotFound from "../components/NotFounded";
import Navbar from "../components/Navbar/navbar";

const MainRouter = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default MainRouter;
