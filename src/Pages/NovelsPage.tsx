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
    // TODO: Remove single chapter search it shouldnt be here!
    const [chapter, setChapter] = useState<Chapter>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleSearch("");
    }, []);

    const handleSearch = async (searchTerm: string) => {
        setError(null);
        setLoading(true);
        setChapters([]);
        setChapter(undefined);

        try {
            const data = await search(searchTerm, "");
            if (data.chapters && data.chapters.length > 0) {
                setChapters(data.chapters);
                return;
            }

            if (data.chapter) {
                setChapter(data.chapter);
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
        <div className="max-w-6xl px-12 w-full flex flex-row flex-nowrap justify-between">
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
                            <NovelCard
                                Title={novel.title}
                                Author={novel.author}
                                Novel={novel}
                                onHover={handleSearch}
                            />
                        ) : (
                            novels.length > 0 &&
                            novels.map((n, index) => {
                                return (
                                    <NovelCard
                                        key={index}
                                        Title={n.Title}
                                        Author={n.Author}
                                        Novel={n.Novel}
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
                <div className="mb-4">
                    <h1 className="text-4xl text-center">Chapters</h1>
                </div>
                {/* Render single or multiple chapters */}
                {chapter ? (
                    <ChapterCard
                        title={chapter.title}
                        author={chapter.author}
                        description={chapter.description}
                        creation_date={chapter.creation_date}
                        update_date={chapter.update_date}
                        upload_date={chapter.upload_date}
                        content={chapter.content}
                    />
                ) : (
                    chapters.length > 0 &&
                    chapters.map((chapter, index) => {
                        return (
                            <ChapterCard
                                title={chapter.title}
                                author={chapter.author}
                                description={chapter.description}
                                creation_date={chapter.creation_date}
                                update_date={chapter.update_date}
                                upload_date={chapter.upload_date}
                                content={chapter.content}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default NovelsPage;
