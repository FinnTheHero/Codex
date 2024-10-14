import { Outlet } from "react-router-dom";

// Components
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Styles
import "../Styles/LayoutStyles.css";
import ScrollButtons from "../Components/ScrollButtons";

const HeroPageLayout = () => {
    return (
        <div className="hero-page-layout">
            <Navbar />
            <div className="w-full flex justify-center">
                <Outlet />
            </div>
            <ScrollButtons />
            <Footer />
        </div>
    );
};

export default HeroPageLayout;
