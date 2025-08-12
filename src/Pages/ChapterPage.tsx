import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormattedTime from "../Components/FormattedTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GoBackButton from "../Components/GoBackButton";
import { Popover } from "react-tiny-popover";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useUser } from "../Contexts/UserContext";
import { useContent } from "../Contexts/ContentContext";

const ChapterPage = () => {
    const { id_novel } = useParams();
    const { id_chapter } = useParams();

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const { user } = useUser();

    const {
        chapter,
        novel,
        novels,
        chapters,
        setChapter,
        setNovel,
        setChapterId,
        loadMore,
        hasMore,
    } = useContent();

    useEffect(() => {
        const setData = () => {
            if (!novel) {
                setNovel(novels.find((novel) => novel.id === id_novel) ?? null);
            }
            if (!chapter) {
                setChapterId(id_chapter ?? null);
            }
            if (chapter && id_chapter !== chapter.id) {
                setChapter(
                    chapters.find((chapter) => chapter.id === id_chapter) ||
                        null,
                );
            }
        };
        setData();
    }, [novels, chapter, chapters, id_novel, id_chapter]);

    const currentIndex = useMemo(() => {
        return chapters.findIndex((chapter) => chapter.id === id_chapter);
    }, [chapters, id_chapter]);

    useEffect(() => {
        if (hasMore && currentIndex >= chapters.length - 1) {
            loadMore();
        }
    }, [hasMore, loadMore, currentIndex, chapters]);

    const NavigationButtons = () => {
        return (
            <div className="max-w-4xl mt-20 text-xl flex flex-col flex-nowrap items-center justify-evenly w-full">
                <div className="flex flex-row flex-nowrap justify-between w-full">
                    {chapter && currentIndex > 0 ? (
                        <Popover
                            isOpen={isPopoverOpen}
                            positions={["bottom", "left"]}
                            padding={10}
                            onClickOutside={() => setIsPopoverOpen(false)}
                            content={
                                <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                                    {chapters[currentIndex - 1].title}
                                </div>
                            }
                        >
                            <Link
                                onMouseEnter={() => setIsPopoverOpen(true)}
                                onMouseLeave={() => setIsPopoverOpen(false)}
                                onClick={() =>
                                    setChapter(chapters[currentIndex - 1])
                                }
                                className="link"
                                to={`/novels/${id_novel}/${chapters[currentIndex - 1].id}#chapter-id`}
                            >
                                [Previous]
                            </Link>
                        </Popover>
                    ) : (
                        <h2 className="text-red-800 pointer-events-none">
                            [First]
                        </h2>
                    )}
                    {currentIndex < chapters.length - 1 && chapter ? (
                        <Popover
                            isOpen={isPopoverOpen}
                            positions={["bottom", "left"]}
                            padding={10}
                            onClickOutside={() => setIsPopoverOpen(false)}
                            content={
                                <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                                    {chapters[currentIndex + 1].title}
                                </div>
                            }
                        >
                            <Link
                                onMouseEnter={() => setIsPopoverOpen(true)}
                                onMouseLeave={() => setIsPopoverOpen(false)}
                                onClick={() =>
                                    setChapter(chapters[currentIndex + 1])
                                }
                                className="link"
                                to={`/novels/${id_novel}/${chapters[currentIndex + 1].id}#chapter-id`}
                            >
                                [Next]
                            </Link>
                        </Popover>
                    ) : (
                        <h2 className="text-red-800 pointer-events-none">
                            [Last]
                        </h2>
                    )}
                </div>

                <GoBackButton
                    className="link mt-4"
                    to={`/novels/${id_novel}#codex`}
                />
            </div>
        );
    };

    return (
        <div className="w-full px-6 flex flex-col flex-nowrap">
            {chapter && novel && (
                <div className="w-full flex flex-col justify-center items-center">
                    {user &&
                        (user.username == novel.author ||
                            user.type == "Admin") && (
                            <Link
                                to={`/dashboard/edit/${novel.id}/${chapter.id}`}
                                className="w-full text-lg content text-center mb-6"
                            >
                                [Edit Chapter]
                            </Link>
                        )}
                    <h2 className="text-base">{novel.title}</h2>
                    <h2 id="chapter-id" className="mb-3 mt-2 text-4xl">
                        {chapter.title}
                    </h2>

                    <p className="max-w-md subtitle text-center">
                        {" > "}
                        {chapter.description}
                    </p>

                    <div className="my-5 flex flex-row justify-center">
                        <FormattedTime
                            date={chapter.creation_date}
                            classname={"subtitle"}
                            popover_text={"Created"}
                        />
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="content mx-3 pt-1"
                        />
                        <FormattedTime
                            date={chapter.update_date}
                            classname={"content"}
                            popover_text={"Last Updated"}
                        />
                    </div>

                    <div className="w-full max-w-3xl mt-4 prose prose-lg font-sans text-lg leading-normal">
                        <ReactMarkdown
                            components={{
                                p: ({ node, ...props }) => (
                                    <p className="mb-5" {...props} />
                                ),
                            }}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        >
                            {chapter.content}
                        </ReactMarkdown>
                    </div>

                    <NavigationButtons />
                </div>
            )}
        </div>
    );
};

export default ChapterPage;
