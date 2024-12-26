import { Link } from "react-router-dom";
import { searchChapter } from "../Services/searchService";
import { NovelCardProps } from "../Types/types";

const NovelCard: React.FC<NovelCardProps> = ({
    novel,
    setNovel,
    setChapters,
    setError,
    setLoading,
}) => {
    let hoverTimeout: ReturnType<typeof setTimeout>;

    const handleChapterSearch = async (
        title_novel: string,
        title_chapter: string,
    ) => {
        setError(null);
        setLoading(true);
        setNovel(null);
        setChapters([]);

        try {
            const data = await searchChapter(title_novel, title_chapter);
            if (data.chapters && data.chapters.length > 0) {
                setNovel(novel);
                setChapters(data.chapters);
                return;
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => {
            handleChapterSearch(novel.title, "all");
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
                <Link to={`/novels/${novel.title}`} className="mx-1 link">
                    [Read]
                </Link>
            </div>
        </div>
    );
};

export default NovelCard;
