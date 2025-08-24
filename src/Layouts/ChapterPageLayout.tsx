import { Outlet } from "react-router-dom";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ScrollButtons from "../Components/ScrollButtons";

const ChapterPageLayout = () => {
    return (
        <div className="chapter-page-layout">
            <Navbar />
            <div className="w-full px-8 flex justify-center">
                <Outlet />
            </div>
            <ScrollButtons />
            <Footer />
        </div>
    );
};

export default ChapterPageLayout;
