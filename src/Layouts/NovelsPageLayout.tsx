import { Outlet } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const NovelsPageLayout = () => {
    return (
        <div className="novels-page-layout">
            <Navbar />
            <div className="w-full px-8 flex justify-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default NovelsPageLayout;
