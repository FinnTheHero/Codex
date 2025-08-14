import { Link } from "react-router-dom";
import { NovelCardProps } from "../Types/types";
import { useContent } from "../Contexts/ContentContext";

const NovelCard: React.FC<NovelCardProps> = ({ novel, index }) => {
    let hoverTimeout: ReturnType<typeof setTimeout>;

    const { novels, setNovel } = useContent();

    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => {
            setNovel(novel);
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
            {novel && (
                <div>
                    <h2 className="text-2xl">{novel.title}</h2>
                    <div className="mx-1 mt-1 flex justify-between">
                        <div className="subtitle">
                            {" > "} {novel.author}
                        </div>
                        <Link
                            onClick={() => {
                                setNovel(novel);
                            }}
                            to={`/novels/${novel.id}#codex`}
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
