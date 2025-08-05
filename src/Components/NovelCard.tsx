import { useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import { Chapter, NovelCardProps } from "../Types/types";
import useSWR, { mutate } from "swr";
import { useContent } from "../Contexts/ContentContext";

const NovelCard: React.FC<NovelCardProps> = ({ index }) => {
    let hoverTimeout: ReturnType<typeof setTimeout>;

    const { novels, setNovel } = useContent();

    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => {
            setNovel(novels[index]);
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
            {novels[index] && (
                <div>
                    <h2 className="text-2xl">{novels[index]?.title}</h2>
                    <div className="mx-1 mt-1 flex justify-between">
                        <div className="subtitle">
                            {" > "} {novels[index].author}
                        </div>
                        <Link
                            to={`/novels/${novels[index].id}`}
                            className="mx-1 link"
                        >
                            [Read]
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NovelCard;
