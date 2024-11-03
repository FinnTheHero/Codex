import { Outlet } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const NovelPageLayout = () => {
    return (
        <div className="novel-page-layout">
            <Navbar />
            <div className="w-full px-8 flex justify-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default NovelPageLayout;
