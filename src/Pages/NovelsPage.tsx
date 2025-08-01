import React, { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

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
    const { novel, novels, chapters } = useContent();
    const [query, setQuery] = useState("");

    const { setLoading } = useLoading();
    const { errors, addError } = useError();

    const fuseOptions = {
        keys: ["title", "author"],
        threshold: 0.4,
    };

    const fuse = useMemo(
        () => new Fuse(novels, fuseOptions),
        [novels, fuseOptions],
    );

    const filteredNovels = useMemo(() => {
        if (!query) {
            return novels;
        }

        return fuse.search(query).map((result) => result.item);
    }, [query, novels]);

    return (
        <div className="min-h-screen max-w-6xl px-8 lg:px-12 w-full flex flex-col flex-nowrap justify-evenly">
            <div className="flex flex-row flex-nowrap justify-between">
                {/* Novel List Display */}
                <div className="w-full lg:w-3/5 flex flex-col flex-nowrap">
                    <div>
                        <h1 className="text-4xl mb-4 text-center">Novels</h1>
                        <SearchBar query={query} onQueryChange={setQuery} />
                    </div>

                    <div className="mt-4">
                        {filteredNovels
                            ? filteredNovels.length > 0 &&
                              filteredNovels.map((_, i) => {
                                  return <NovelCard index={i} key={i} />;
                              })
                            : novels.length > 0 &&
                              novels.map((_, i) => {
                                  return <NovelCard index={i} key={i} />;
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
                            chapters.map((_, i) => {
                                return <ChapterCard index={i} key={i} />;
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
