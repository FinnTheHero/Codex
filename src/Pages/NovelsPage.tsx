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
import useSWR from "swr";
import { useContent } from "../Contexts/ContentContext";

const NovelsPage: React.FC = () => {
    const { novel, novels, setNovels, chapters, setChapters } = useContent();

    const { data, error } = useSWR<any>(`/all`);
    const { setLoading } = useLoading();
    const { errors, addError } = useError();

    const { searchAllChaptersHandler, searchAllNovelsHandler } =
        useSearchHandler();

    const handleAllNovelsSearch = useCallback(() => {
        try {
            if (data.novels) {
                setNovels(data.novels as Novel[]);
                console.log(data.novels);
            }
        } catch (err) {}
    }, []);

    // Load default stuff
    useEffect(() => {
        handleAllNovelsSearch();
    }, []);

    return (
        <div className="min-h-screen max-w-6xl px-8 lg:px-12 w-full flex flex-col flex-nowrap justify-evenly">
            <div className="flex flex-row flex-nowrap justify-between">
                {/* Novel List Display */}
                <div className="w-full lg:w-3/5 flex flex-col flex-nowrap">
                    <div>
                        <h1 className="text-4xl mb-4 text-center">Novels</h1>
                        <SearchBar />
                    </div>

                    <div className="mt-4">
                        {novels.length > 0 &&
                            novels.map((n, index) => {
                                return <NovelCard index={index} key={index} />;
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
