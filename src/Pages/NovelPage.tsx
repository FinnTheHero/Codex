import { useParams } from "react-router-dom";
import { search } from "../Services/searchService";
import { useEffect, useState } from "react";
import { Chapter, Novel } from "../Types/types";
import ErrorAlert from "../Components/ErrorAlert";
import LoadingAlert from "../Components/LoadingAlert";
import ChapterCard from "../Components/ChapterCard";

const NovelPage = () => {
    // Get novel title
    const { title } = useParams();

    const [novel, setNovel] = useState<Novel>();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (title !== undefined) {
            handleNovelSearch(title);
            handleChapterSearch(title);
        }
    }, [title]);

    const handleChapterSearch = async (searchTerm: string) => {
        setError(null);
        setLoading(true);
        try {
            const data = await search(searchTerm, "all");
            if (data.chapters && data.chapters.length > 0) {
                setChapters(data.chapters);
                return;
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleNovelSearch = async (searchTerm: string) => {
        setError(null);
        setLoading(true);
        try {
            const data = await search(searchTerm, "");
            if (data.novel) {
                setNovel(data.novel);
                return;
            }
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
        <div className="max-w-6xl px-12 w-full">
            {error ? <ErrorAlert error={error} /> : loading && <LoadingAlert />}

            <div className="w-2/5 flex flex-col flex-nowrap">
                {novel && (
                    <div>
                        <h2 className="text-2xl">{novel.title}</h2>
                        <h2 className="mx-1 mt-1 flex justify-between">
                            <div className="text-1xl">
                                {" "}
                                {" > "} {novel.author}
                            </div>
                        </h2>
                    </div>
                )}
            </div>

            <div className="w-3/5 flex flex-col flex-nowrap">
                {chapters &&
                    chapters.length > 0 &&
                    chapters.map((chapter, index) => (
                        <ChapterCard
                            title={chapter.title}
                            author={chapter.author}
                            description={chapter.description}
                            creation_date={chapter.creation_date}
                            update_date={chapter.update_date}
                            upload_date={chapter.upload_date}
                            content={chapter.content}
                            key={index}
                        />
                    ))}
            </div>
        </div>
    );
};

export default NovelPage;
