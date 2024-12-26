import React, { useEffect, useState } from "react";

// Services
import { searchChapter, searchNovel } from "../Services/searchService";

// Types
import { Chapter, Novel } from "../Types/types";

// Components
import SearchBar from "../Components/SearchBar";
import NovelCard from "../Components/NovelCard";
import ChapterCard from "../Components/ChapterCard";
import ErrorAlert from "../Components/ErrorAlert";
import LoadingAlert from "../Components/LoadingAlert";

// Styles
import "../Styles/PageStyles.css";
import { useCallback } from "react";
import GoBackButton from "../Components/GoBackButton";

const NovelsPage: React.FC = () => {
    const [novels, setNovels] = useState<Novel[]>([]);
    const [novel, setNovel] = useState<Novel | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const addNovel = (novel: Novel) => {
        setNovels((old) => [...old, novel]);
    };

    const clearNovels = () => {
        setNovels([]);
    };

    const findNovel = useCallback(async (title_novel: string) => {
        setError(null);
        setLoading(true);

        try {
            const data = await searchNovel(title_novel);
            if (data.novel) {
                clearNovels();
                addNovel(data.novel);
                return;
            }

            if (data.novels && data.novels.length > 0) {
                setNovels(data.novels);
                return;
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, []);

    const findChapter = useCallback(
        async (title_novel: string, title_chapter: string) => {
            setError(null);
            setLoading(true);

            try {
                const data = await searchChapter(title_novel, title_chapter);
                if (data.chapters && data.chapters.length > 0) {
                    setChapters(data.chapters);
                    return;
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    // Load default stuff
    useEffect(() => {
        findNovel("");
        findChapter("", "");
    }, [findNovel, findChapter]);

    // Clear Error
    useEffect(() => {
        if (error !== null) {
            const timer = setTimeout(() => {
                setError(null);
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="min-h-screen max-w-6xl px-8 lg:px-12 w-full flex flex-col flex-nowrap justify-evenly">
            {/* Handle Error and Loading alerts */}
            {error ? <ErrorAlert error={error} /> : loading && <LoadingAlert />}
            <div className="flex flex-row flex-nowrap justify-between">
                {/* Novel List Display */}
                <div className="w-full lg:w-3/5 flex flex-col flex-nowrap">
                    <div>
                        <h1 className="text-4xl mb-4 text-center">Novels</h1>
                        <SearchBar onSearch={findNovel} />
                    </div>

                    <div className="mt-4">
                        {novels.length > 0 &&
                            novels.map((n, index) => {
                                return (
                                    <NovelCard
                                        novel={n}
                                        setNovel={setNovel}
                                        setChapters={setChapters}
                                        setError={setError}
                                        setLoading={setLoading}
                                        key={index}
                                    />
                                );
                            })}
                    </div>
                </div>
                {/* Chapter List Preview */}
                <div className="hidden lg:visible w-2/6 lg:flex flex-col flex-nowrap">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl text-center">Chapters</h2>
                        <h2 className="text-2xl text-center">
                            {novel && (novel.title || "")}
                        </h2>
                    </div>

                    <div>
                        {chapters.length > 0 ? (
                            novel &&
                            chapters.map((chapter, index) => {
                                return (
                                    <ChapterCard
                                        novel={novel}
                                        chapter={chapter}
                                        key={index}
                                    />
                                );
                            })
                        ) : (
                            <p className="subtitle text-center mt-16">
                                Hover or Tap the novel to reveal chapters
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <GoBackButton className={"text-xl mt-10 link text-center"} to="/" />
        </div>
    );
};

export default NovelsPage;
