import React, { useEffect, useState } from "react";

// Types
import { Chapter, Novel } from "../Types/types";

// Components
import SearchBar from "../Components/SearchBar";
import NovelCard from "../Components/NovelCard";
import ChapterCard from "../Components/ChapterCard";

// Styles
import "../Styles/PageStyles.css";
import { useCallback } from "react";
import GoBackButton from "../Components/GoBackButton";
import { useSearchHandler } from "../Components/SearchHandler";
import { useLoading } from "../Contexts/LoadingContext";
import { useError } from "../Contexts/ErrorContext";

const NovelsPage: React.FC = () => {
    const [novels, setNovels] = useState<Novel[]>([]);
    const [novel, setNovel] = useState<Novel | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);

    const { setLoading } = useLoading();
    const { error, setError } = useError();

    const { searchNovelHandler } = useSearchHandler();

    const handleNovelSearch = useCallback(async (title_novel: string) => {
        await searchNovelHandler({
            title_novel: title_novel,
            setNovel,
            setNovels,
        });
    }, []);

    // Load default stuff
    useEffect(() => {
        handleNovelSearch("");
    }, []);

    // Clear Error
    useEffect(() => {
        if (error !== null) {
            const timer = setTimeout(() => {
                setError(null);
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className="min-h-screen max-w-6xl px-8 lg:px-12 w-full flex flex-col flex-nowrap justify-evenly">
            <div className="flex flex-row flex-nowrap justify-between">
                {/* Novel List Display */}
                <div className="w-full lg:w-3/5 flex flex-col flex-nowrap">
                    <div>
                        <h1 className="text-4xl mb-4 text-center">Novels</h1>
                        <SearchBar setNovels={setNovels} setNovel={setNovel} />
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
