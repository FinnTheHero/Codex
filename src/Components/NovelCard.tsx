import { Link } from "react-router-dom";
import { NovelCardProps } from "../Types/types";

const NovelCard: React.FC<NovelCardProps> = ({ novel, onHover, chapters }) => {
    let hoverTimeout: ReturnType<typeof setTimeout>;

    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => {
            // TODO: WTF IS THIS 😭 when did i even write this ? wtf, need to update ASAP.
            onHover(novel.title, "all");
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
            <h2 className="mx-1 mt-1 flex justify-between">
                <div className="subtitle">
                    {" "}
                    {" > "} {novel.author}
                </div>
                <Link
                    to={`/novels/${novel.title}`}
                    state={{ novel: novel, chapters: chapters }}
                    className="mx-1 link"
                >
                    [Read]
                </Link>
            </h2>
        </div>
    );
};

export default NovelCard;
