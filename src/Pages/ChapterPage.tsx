import { ReactElement, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormattedTime from "../Components/FormattedTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GoBackButton from "../Components/GoBackButton";
import { Popover } from "react-tiny-popover";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useUser } from "../Contexts/UserContext";
import { useContent } from "../Contexts/ContentContext";
import Navigation from "epubjs/types/navigation";

const ChapterPage = () => {
    const { id_novel } = useParams();
    const { id_chapter } = useParams();

    const { user, fontSize, padding, sortBy } = useUser();

    const [isLeftPopoverOpen, setIsLeftPopoverOpen] = useState(false);
    const [isRightPopoverOpen, setIsRightPopoverOpen] = useState(false);
    const [isBackPopoverOpen, setIsBackPopoverOpen] = useState(false);

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

    const NavigationButtons: React.FC<{ goBack?: boolean }> = ({ goBack }) => {
        const isAscending = sortBy === "asc" ? true : false;

        const prevIndex = isAscending ? currentIndex - 1 : currentIndex + 1;
        const nextIndex = isAscending ? currentIndex + 1 : currentIndex - 1;

        const hasPrev = isAscending
            ? currentIndex > 0
            : currentIndex < chapters.length - 1;
        const hasNext = isAscending
            ? currentIndex < chapters.length - 1
            : currentIndex > 0;

        return (
            <div className="max-w-4xl px-12 mt-8 text-xl flex flex-col flex-nowrap items-center justify-evenly w-full">
                <div className="flex flex-row flex-nowrap justify-between w-full text-xl">
                    {/* Previous Chapter (Left Arrow) */}
                    {hasPrev ? (
                        <Popover
                            isOpen={isLeftPopoverOpen}
                            positions={["right"]}
                            padding={10}
                            reposition={true}
                            boundaryInset={document.body.scrollHeight}
                            onClickOutside={() => setIsLeftPopoverOpen(false)}
                            content={
                                <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                                    [{chapters[prevIndex].title}]
                                </div>
                            }
                        >
                            <Link
                                onMouseEnter={() => setIsLeftPopoverOpen(true)}
                                onMouseLeave={() => setIsLeftPopoverOpen(false)}
                                onClick={() => {
                                    setChapter(chapters[prevIndex]);
                                }}
                                className="link flex items-center"
                                to={`/novels/${id_novel}/${chapters[prevIndex].id}#chapter-id`}
                            >
                                [<FontAwesomeIcon icon={faArrowLeft} />]
                            </Link>
                        </Popover>
                    ) : (
                        <h2 className="text-red-800 pointer-events-none flex items-center">
                            [<FontAwesomeIcon icon={faArrowLeft} />]
                        </h2>
                    )}

                    {/* Next Chapter (Right Arrow) */}
                    {hasNext ? (
                        <Popover
                            isOpen={isRightPopoverOpen}
                            positions={["left"]}
                            padding={10}
                            reposition={true}
                            boundaryInset={document.body.scrollHeight}
                            onClickOutside={() => setIsRightPopoverOpen(false)}
                            content={
                                <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                                    [{chapters[nextIndex].title}]
                                </div>
                            }
                        >
                            <Link
                                onMouseEnter={() => setIsRightPopoverOpen(true)}
                                onMouseLeave={() =>
                                    setIsRightPopoverOpen(false)
                                }
                                onClick={() => {
                                    setChapter(chapters[nextIndex]);
                                }}
                                className="link flex items-center"
                                to={`/novels/${id_novel}/${chapters[nextIndex].id}#chapter-id`}
                            >
                                [<FontAwesomeIcon icon={faArrowRight} />]
                            </Link>
                        </Popover>
                    ) : (
                        <h2 className="text-red-800 pointer-events-none flex items-center">
                            [<FontAwesomeIcon icon={faArrowRight} />]
                        </h2>
                    )}
                </div>
                {goBack && (
                    <GoBackButton
                        className="link mt-4"
                        to={`/novels/${id_novel}#root`}
                        desc={`${novel?.title}`}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="w-full flex flex-col flex-nowrap">
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
                    <h2
                        id="chapter-id"
                        className="mb-3 mt-2 text-4xl text-center"
                    >
                        {chapter.title}
                    </h2>

                    <div className="mt-5 flex flex-row justify-center items-center">
                        {chapter.creation_date !== chapter.update_date ? (
                            <div className="flex flex-row justify-center items-center">
                                <FormattedTime
                                    date={chapter.creation_date}
                                    classname={"content"}
                                    popover_text={"Created"}
                                />
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="mx-2"
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        <FormattedTime
                            date={chapter.update_date}
                            classname={"link"}
                            popover_text={"Last Updated"}
                        />
                    </div>

                    <NavigationButtons />

                    <div
                        id="chapter-content"
                        className={`mt-8 prose prose-lg font-sans text-${fontSize ?? "md"} leading-normal`}
                        style={{ width: `${padding}%` }}
                    >
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

                    <NavigationButtons goBack />
                </div>
            )}
        </div>
    );
};

export default ChapterPage;
