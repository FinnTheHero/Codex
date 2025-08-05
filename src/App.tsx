import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

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
import { PageAnimationWrapper } from "./Components/PageAnimationWrapper";
import UploadEPUBPage from "./Pages/UploadEPUBPage";
import UploadNovelPage from "./Pages/UploadNovelPage";

function App() {
    return (
        <div className="App">
            <Router>
                <RouterTransition />
            </Router>

            <Analytics />
            <SpeedInsights />
        </div>
    );
}

const RouterTransition = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HeroPageLayout />}>
                    <Route
                        index
                        element={
                            <PageAnimationWrapper>
                                <HeroPage />
                            </PageAnimationWrapper>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <PageAnimationWrapper>
                                <NotFound />
                            </PageAnimationWrapper>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <PageAnimationWrapper>
                                <AboutPage />
                            </PageAnimationWrapper>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PageAnimationWrapper>
                                <DenyUserAuth>
                                    <LoginPage />
                                </DenyUserAuth>
                            </PageAnimationWrapper>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PageAnimationWrapper>
                                <DenyUserAuth>
                                    <RegisterPage />
                                </DenyUserAuth>
                            </PageAnimationWrapper>
                        }
                    />
                </Route>
                <Route path="/novels" element={<NovelsPageLayout />}>
                    <Route
                        index
                        element={
                            <PageAnimationWrapper>
                                <NovelsPage />
                            </PageAnimationWrapper>
                        }
                    />
                </Route>
                <Route path="/novels/:id_novel" element={<NovelPageLayout />}>
                    <Route
                        index
                        element={
                            <PageAnimationWrapper>
                                <NovelPage />
                            </PageAnimationWrapper>
                        }
                    />
                </Route>
                <Route
                    path="/novels/:id_novel/:id_chapter"
                    element={<ChapterPageLayout />}
                >
                    <Route
                        index
                        element={
                            <PageAnimationWrapper>
                                <ChapterPage />
                            </PageAnimationWrapper>
                        }
                    />
                </Route>

                <Route path="/dashboard" element={<HeroPageLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route
                        path="/dashboard/edit/:id_novel"
                        element={
                            <PageAnimationWrapper>
                                <EditPageAccess>
                                    <EditNovelPage />
                                </EditPageAccess>
                            </PageAnimationWrapper>
                        }
                    />
                    <Route
                        path="/dashboard/edit/:id_novel/:id_chapter"
                        element={
                            <PageAnimationWrapper>
                                <EditPageAccess>
                                    <EditChapterPage />
                                </EditPageAccess>
                            </PageAnimationWrapper>
                        }
                    />
                    <Route
                        path="/dashboard/upload"
                        element={
                            <PageAnimationWrapper>
                                <RequireUser>
                                    <UploadPage />
                                </RequireUser>
                            </PageAnimationWrapper>
                        }
                    />

                    <Route
                        path="/dashboard/upload/novel"
                        element={
                            <PageAnimationWrapper>
                                <RequireUser>
                                    <UploadNovelPage />
                                </RequireUser>
                            </PageAnimationWrapper>
                        }
                    />

                    <Route
                        path="/dashboard/upload/epub"
                        element={
                            <PageAnimationWrapper>
                                <RequireUser>
                                    <UploadEPUBPage />
                                </RequireUser>
                            </PageAnimationWrapper>
                        }
                    />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

export default App;
