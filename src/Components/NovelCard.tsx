import { NovelDTO } from "../Types/types";

const NovelCard: React.FC<NovelDTO> = ({ Title, Author, Novel, onHover }) => {
    let hoverTimeout: ReturnType<typeof setTimeout>;

    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => {
            onHover(`${Title}/all`);
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
            <h2 className="text-2xl">{Title}</h2>
            <h2 className="text-1xl">{Author}</h2>
        </div>
    );
};

export default NovelCard;
