import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Styles
import "./App.css";
import "./Styles/ComponentStyles.css";
import "./Styles/LayoutStyles.css";
import "./Styles/PageStyles.css";
import "@mdxeditor/editor/style.css";

// Layouts
import HeroPageLayout from "./Layouts/HeroPageLayout";
import NovelPageLayout from "./Layouts/NovelPageLayout";
import ChapterPageLayout from "./Layouts/ChapterPageLayout";
import NovelsPageLayout from "./Layouts/NovelsPageLayout";

// Pages
import HeroPage from "./Pages/HeroPage";
import NotFound from "./Pages/404";
import NovelsPage from "./Pages/NovelsPage";
import AboutPage from "./Pages/AboutPage";
import NovelPage from "./Pages/NovelPage";
import ChapterPage from "./Pages/ChapterPage";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import UploadPage from "./Pages/UploadPage";

// Components
import {
    DenyUserAuth,
    EditPageAccess,
    RequireUser,
} from "./Components/AuthGuard";
import EditNovelPage from "./Pages/EditNovelPage";
import EditChapterPage from "./Pages/EditChapterPage";

function App() {
    return (
        <div className="App">
            <Router>
                <RouterTransition />
            </Router>

            <SpeedInsights />
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
                        <Route
                            path="/login"
                            element={
                                <DenyUserAuth>
                                    <LoginPage />
                                </DenyUserAuth>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <DenyUserAuth>
                                    <RegisterPage />
                                </DenyUserAuth>
                            }
                        />
                    </Route>
                    <Route path="/novels" element={<NovelsPageLayout />}>
                        <Route index element={<NovelsPage />} />
                    </Route>
                    <Route
                        path="/novels/:id_novel"
                        element={<NovelPageLayout />}
                    >
                        <Route index element={<NovelPage />} />
                    </Route>
                    <Route
                        path="/novels/:id_novel/:id_chapter"
                        element={<ChapterPageLayout />}
                    >
                        <Route index element={<ChapterPage />} />
                    </Route>

                    <Route path="/dashboard" element={<HeroPageLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route
                            path="/dashboard/edit/:id_novel"
                            element={
                                <EditPageAccess>
                                    <EditNovelPage />
                                </EditPageAccess>
                            }
                        />
                        <Route
                            path="/dashboard/edit/:id_novel/:id_chapter"
                            element={
                                <EditPageAccess>
                                    <EditChapterPage />
                                </EditPageAccess>
                            }
                        />
                        <Route
                            path="/dashboard/upload"
                            element={
                                <RequireUser>
                                    <UploadPage />
                                </RequireUser>
                            }
                        />
                    </Route>
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default App;
