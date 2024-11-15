import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Styles
import "./App.css";
import "./Styles/ComponentStyles.css";
import "./Styles/LayoutStyles.css";
import "./Styles/PageStyles.css";

// Layouts
import HeroPageLayout from "./Layouts/HeroPageLayout";

// Pages
import HeroPage from "./Pages/HeroPage";
import NotFound from "./Pages/404";
import NovelsPage from "./Pages/NovelsPage";
import AboutPage from "./Pages/AboutPage";
import NovelPage from "./Pages/NovelPage";
import NovelPageLayout from "./Layouts/NovelPageLayout";
import ChapterPage from "./Pages/ChapterPage";
import ChapterPageLayout from "./Layouts/ChapterPageLayout";
import NovelsPageLayout from "./Layouts/NovelsPageLayout";

function App() {
    return (
        <div className="App">
            <Router>
                <RouterTransition />
            </Router>
        </div>
    );
}

const RouterTransition = () => {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition timeout={300} classNames="fade" key={location.key}>
                <Routes>
                    <Route path="/" element={<HeroPageLayout />}>
                        <Route index element={<HeroPage />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Route>
                    <Route path="/novels" element={<NovelsPageLayout />}>
                        <Route path="/novels" element={<NovelsPage />} />
                    </Route>
                    <Route
                        path="/novels/:novelTitle"
                        element={<NovelPageLayout />}
                    >
                        <Route index element={<NovelPage />} />
                    </Route>
                    <Route
                        path="/novels/:novelTitle/:chapterTitle"
                        element={<ChapterPageLayout />}
                    >
                        <Route index element={<ChapterPage />} />
                    </Route>
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default App;
