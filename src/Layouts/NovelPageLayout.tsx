import { Outlet } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ScrollButtons from "../Components/ScrollButtons";

const NovelPageLayout = () => {
    return (
        <div className="novel-page-layout">
            <Navbar />
            <div className="content">
                <Outlet />
            </div>
            <ScrollButtons />
            <Footer />
        </div>
    );
};

export default NovelPageLayout;
