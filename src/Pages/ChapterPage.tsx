import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Chapter, Novel } from "../Types/types";
import ErrorAlert from "../Components/ErrorAlert";
import LoadingAlert from "../Components/LoadingAlert";
import FormattedTime from "../Components/FormattedTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GoBackButton from "../Components/GoBackButton";
import Popover from "../Components/Popover";
import { useSearchHandler } from "../Components/SearchHandler";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import ReactMarkdown from "react-markdown";
import { addToMarkdownExtension$ } from "@mdxeditor/editor";
import remarkGfm from "remark-gfm";

const ChapterPage = () => {
    const { id_novel } = useParams();
    const { id_chapter } = useParams();

    const { errors, addError } = useError();
    const { loading } = useLoading();

    const [novel, setNovel] = useState<Novel | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [chapter, setChapter] = useState<Chapter | null>(null);

    const { searchChapterHandler, searchNovelHandler } = useSearchHandler();

    // TODO: Create a method for navigation for new backend.

    const handleNovelSearch = useCallback(async () => {
        if (id_novel) {
            await searchNovelHandler({
                id_novel,
                common: { setNovel },
            });
        } else {
            addError("Novel title not found!");
        }
    }, [id_novel, searchNovelHandler]);

    const handleChapterSearch = useCallback(async () => {
        if (id_novel && id_chapter) {
            await searchChapterHandler({
                id_novel,
                id_chapter,
                common: { setChapter },
            });
        } else {
            addError("Novel or Chapter title not found!");
        }
    }, [id_novel, id_chapter, searchChapterHandler]);

    useEffect(() => {
        handleNovelSearch();
        handleChapterSearch();
    }, []);

    const NavigationButtons = ({
        prevChapter,
        nextChapter,
    }: {
        prevChapter: Chapter | null;
        nextChapter: Chapter | null;
    }) => {
        return (
            <div className="max-w-2xl mt-20 text-xl flex flex-col flex-nowrap items-center justify-evenly w-full">
                <div className="flex flex-row flex-nowrap justify-between w-full">
                    {prevChapter ? (
                        <Popover text={prevChapter.title}>
                            <Link
                                className="link"
                                to={`/novels/${id_novel}/${prevChapter.id}`}
                            >
                                [Previous]
                            </Link>
                        </Popover>
                    ) : (
                        <h2 className="text-red-800 pointer-events-none">
                            [First]
                        </h2>
                    )}
                    {nextChapter ? (
                        <Popover text={nextChapter.title}>
                            <Link
                                className="link"
                                to={`/novels/${id_novel}/${nextChapter.id}`}
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
                    to={`/novels/${id_novel}`}
                />
            </div>
        );
    };

    return (
        <div className="max-w-5xl w-full px-12 flex flex-col flex-nowrap">
            {chapter && novel && (
                <div className="flex flex-col justify-center items-center">
                    <Link
                        to={`/dashboard/${novel.id}/${chapter.id}`}
                        className="w-full text-lg content text-end"
                    >
                        [Edit Chapter]
                    </Link>
                    <h2 className="text-base">{novel.title}</h2>
                    <h2 className="mb-3 mt-2 text-4xl">{chapter.title}</h2>

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

                    <p className="subtitle">{chapter.description}</p>

                    <ReactMarkdown
                        className="prose max-w-2xl mt-4"
                        remarkPlugins={[remarkGfm]}
                    >
                        {chapter.content}
                    </ReactMarkdown>

                    {/* <NavigationButtons
                        prevChapter={}
                        nextChapter={}
                    /> */}
                </div>
            )}
        </div>
    );
};

export default ChapterPage;
