import { Outlet } from "react-router-dom";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ScrollButtons from "../Components/ScrollButtons";
import SettingsSidebar from "../Components/SettingsSidebar";
import ProgressIndicator from "../Components/ProgressIndicator";

const ChapterPageLayout = () => {
    return (
        <div className="chapter-page-layout">
            <Navbar />
            <div className="w-full flex justify-center">
                <Outlet />
            </div>
            <ProgressIndicator />
            <SettingsSidebar />
            <ScrollButtons />
            <Footer />
        </div>
    );
};

export default ChapterPageLayout;
