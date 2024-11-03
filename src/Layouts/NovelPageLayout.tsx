import { Outlet } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const NovelPageLayout = () => {
    return (
        <div className="novel-page-layout">
            <Navbar />
            <div className="w-full flex justify-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default NovelPageLayout;
