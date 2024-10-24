import React, { useEffect, useState } from "react";
import { search } from "../Services/searchService";
import { Chapter, Novel, NovelDTO } from "../Types/types";

// Components
import SearchBar from "../Components/SearchBar";
import NovelCard from "../Components/NovelCard";
import ChapterCard from "../Components/ChapterCard";
import ErrorAlert from "../Components/ErrorAlert";

// Styles
import "../Styles/PageStyles.css";
import LoadingAlert from "../Components/LoadingAlert";

const NovelsPage: React.FC = () => {
    const [novels, setNovels] = useState<NovelDTO[]>([]);
    const [novel, setNovel] = useState<Novel>();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleSearch("", "");
    }, []);

    const handleSearch = async (searchTerm1: string, searchTerm2: string) => {
        setError(null);
        setLoading(true);
        setChapters([]);

        try {
            const data = await search(searchTerm1, searchTerm2);
            if (data.chapters && data.chapters.length > 0) {
                setChapters(data.chapters);
                return;
            }

            if (data.novels && data.novels.length > 0) {
                setNovel(undefined);
                setNovels(data.novels);
                return;
            }

            if (data.novel) {
                setNovel(data.novel);
                return;
            }

            setNovels(data.novels);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

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
        <div className="min-h-screen max-w-6xl px-12 w-full flex flex-row flex-nowrap justify-between">
            {/* Novel List Display */}
            <div className="w-2/5 flex flex-col flex-nowrap">
                <div>
                    <h1 className="text-4xl mb-4 text-center">Novels</h1>
                    <SearchBar onSearch={handleSearch} />
                </div>

                {error !== null ? (
                    <ErrorAlert error={error} />
                ) : (
                    loading && <LoadingAlert />
                )}

                {
                    <div className="novels-list mt-12">
                        {/* Rended single or multiple novels */}
                        {novel ? (
                            <NovelCard novel={novel} onHover={handleSearch} />
                        ) : (
                            novels.length > 0 &&
                            novels.map((n, index) => {
                                return (
                                    <NovelCard
                                        novel={n.Novel}
                                        onHover={handleSearch}
                                    />
                                );
                            })
                        )}
                    </div>
                }
            </div>
            {/* Chapter List Preview */}
            <div className="w-2/5 flex flex-col flex-nowrap">
                <div className="mb-4 text-center">
                    <h1 className="text-4xl text-center">Chapters</h1>
                    <p className="subtitle">
                        Hover the novel to reveal chapters
                    </p>
                </div>
                {/* Render single or multiple chapters */}
                {chapters.length > 0 &&
                    chapters.map((chapter, index) => {
                        return <ChapterCard chapter={chapter} key={index} />;
                    })}
            </div>
        </div>
    );
};

export default NovelsPage;
