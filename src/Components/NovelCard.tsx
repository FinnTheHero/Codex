import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import { searchAllChapters, searchChapter } from "../Services/searchService";
import { Chapter, NovelCardProps } from "../Types/types";
import { useSearchHandler } from "./SearchHandler";
import useSWR from "swr";
import { useContent } from "../Contexts/ContentContext";

const NovelCard: React.FC<NovelCardProps> = ({ index }) => {
    let hoverTimeout: ReturnType<typeof setTimeout>;

    const { novel, novels, setNovel, setChapters } = useContent();

    setNovel(novels[index]);

    const { data, error } = useSWR<any>(novel ? `/${novel.id}/all` : null);
    const { setLoading } = useLoading();
    const { addError } = useError();

    const handleAllChaptersSearch = async () => {
        setLoading(true);
        setChapters([]);

        try {
            if (data.chapters && data.chapters.length > 0) {
                setNovel(novel);
                setChapters(data.chapters as Chapter[]);
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
            handleAllChaptersSearch();
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
            {novels && (
                <div>
                    <h2 className="text-2xl">{novel?.title}</h2>
                    <div className="mx-1 mt-1 flex justify-between">
                        <div className="subtitle">
                            {" > "} {novel?.author}
                        </div>
                        <Link to={`/novels/${novel?.id}`} className="mx-1 link">
                            [Read]
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NovelCard;
