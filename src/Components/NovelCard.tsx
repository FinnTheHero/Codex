import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import { searchAllChapters, searchChapter } from "../Services/searchService";
import { NovelCardProps } from "../Types/types";
import { useSearchHandler } from "./SearchHandler";

const NovelCard: React.FC<NovelCardProps> = ({
    novel,
    setNovel,
    setChapters,
}) => {
    const { searchAllChaptersHandler, searchAllNovelsHandler } =
        useSearchHandler();
    let hoverTimeout: ReturnType<typeof setTimeout>;

    const { setLoading } = useLoading();
    const { addError } = useError();

    const handleAllChaptersSearch = async (title_novel: string) => {
        setLoading(true);
        setNovel(null);
        setChapters([]);

        try {
            const data = await searchAllChapters(title_novel);
            if (data.chapters && data.chapters.length > 0) {
                setNovel(novel);
                setChapters(data.chapters);
                return;
            }
        } catch (err) {
            addError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => {
            handleAllChaptersSearch(novel.id);
        }, 1000);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="my-3 py-2 border-b border-zinc-800"
        >
            <h2 className="text-2xl">{novel.title}</h2>
            <div className="mx-1 mt-1 flex justify-between">
                <div className="subtitle">
                    {" > "} {novel.author}
                </div>
                <Link to={`/novels/${novel.id}`} className="mx-1 link">
                    [Read]
                </Link>
            </div>
        </div>
    );
};

export default NovelCard;
