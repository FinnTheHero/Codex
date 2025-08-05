import { Outlet } from "react-router-dom";

// Components
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Styles
import "../Styles/LayoutStyles.css";

const HeroPageLayout = () => {
    return (
        <div className="hero-page-layout">
            <Navbar />
            <div className="w-full h-full flex justify-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default HeroPageLayout;
