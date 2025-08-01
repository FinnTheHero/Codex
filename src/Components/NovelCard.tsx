import { useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import { Chapter, NovelCardProps } from "../Types/types";
import { useSearchHandler } from "./SearchHandler";
import useSWR, { mutate } from "swr";
import { useContent } from "../Contexts/ContentContext";

const NovelCard: React.FC<NovelCardProps> = ({ index }) => {
    let hoverTimeout: ReturnType<typeof setTimeout>;

    const { novel, novels, setNovel } = useContent();

    useEffect(() => {
        setNovel(novels[index]);
    }, []);

    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => {}, 1000);
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
            {novel && (
                <div>
                    <h2 className="text-2xl">{novel?.title}</h2>
                    <div className="mx-1 mt-1 flex justify-between">
                        <div className="subtitle">
                            {" > "} {novel.author}
                        </div>
                        <Link to={`/novels/${novel.id}`} className="mx-1 link">
                            [Read]
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NovelCard;
