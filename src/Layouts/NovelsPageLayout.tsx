import { Outlet } from "react-router-dom";

// Components
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const NovelsPageLayout = () => {
    return (
        <div className="">
            <Navbar />
            <div className="w-full flex justify-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default NovelsPageLayout;
