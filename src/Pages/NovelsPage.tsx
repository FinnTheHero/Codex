import React, { useEffect, useState } from "react";
import { search } from "../Services/searchService";
import { Chapter, Novel, NovelDTO } from "../Types/types";

// Components
import SearchBar from "../Components/SearchBar";
import NovelCard from "../Components/NovelCard";
import ChapterCard from "../Components/ChapterCard";

// Styles
import "../Styles/PageStyles.css";

const NovelsPage: React.FC = () => {
    const [novels, setNovels] = useState<NovelDTO[]>([]);
    const [novel, setNovel] = useState<Novel>();
    const [chapters, setChapters] = useState<Chapter[]>([]);
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
                    <div
                        id="toast-top-right"
                        className="custom-alert fixed flex items-center w-full max-w-xs p-4 space-x-4 divide-x rtl:divide-x-reverse rounded-lg top-5 right-5"
                        role="alert"
                        style={{ color: "red", borderColor: "red" }}
                    >
                        <div className="text-1xl">{error}</div>
                    </div>
                ) : (
                    loading && (
                        <div
                            id="toast-top-right"
                            className="custom-alert fixed w-max max-w-xl p-4 space-x-4 divide-x rtl:divide-x-reverse rounded-lg top-5 right-5"
                            role="alert"
                        >
                            <div className="content">
                                <h1 className="text-1xl">Loading</h1>
                                {loading && (
                                    <div className="ml-12" role="status">
                                        <svg
                                            aria-hidden="true"
                                            className="w-8 h-8 animate-spin fill-spinner"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
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
