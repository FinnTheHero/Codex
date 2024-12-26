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

const ChapterPage = () => {
    const { novelTitle } = useParams();
    const { chapterTitle } = useParams();

    const { error, setError } = useError();
    const { loading, setLoading } = useLoading();

    const [novel, setNovel] = useState<Novel | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [chapter, setChapter] = useState<Chapter | null>(null);

    const [prevChapter, setPrevChapter] = useState<Chapter | null>(null);
    const [nextChapter, setNextChapter] = useState<Chapter | null>(null);

    const { searchChapterHandler, searchNovelHandler } = useSearchHandler();

    const handleNovelSearch = useCallback(() => {
        if (novelTitle) {
            searchNovelHandler({
                title_novel: novelTitle,
                setNovel,
            });
        } else {
            setError("Novel title not found!");
        }
    }, [novelTitle, searchNovelHandler, setError]);

    const handleChapterSearch = useCallback(
        (c?: string) => {
            if (novelTitle && chapterTitle) {
                searchChapterHandler({
                    title_novel: novelTitle,
                    title_chapter: c || chapterTitle,
                    setChapter,
                    setChapters,
                });
            } else {
                setError("Novel or Chapter title not found!");
            }
        },
        [novelTitle, chapterTitle, searchChapterHandler, setError],
    );

    const getNextChapter = useCallback(() => {
        if (!chapter || !chapters.length) return null;
        const currentIndex = chapters.findIndex(
            (ch) => ch.title === chapter.title,
        );
        return chapters[currentIndex - 1] || null;
    }, [chapter, chapters]);

    const getPreviousChapter = useCallback(() => {
        if (!chapter || !chapters.length) return null;
        const currentIndex = chapters.findIndex(
            (ch) => ch.title === chapter.title,
        );
        return chapters[currentIndex + 1] || null;
    }, [chapter, chapters]);

    useEffect(() => {
        setPrevChapter(getPreviousChapter());
        setNextChapter(getNextChapter());
    }, [setPrevChapter, getPreviousChapter, setNextChapter, getNextChapter]);

    useEffect(() => {
        handleNovelSearch();
        handleChapterSearch();
        handleChapterSearch("all");
    }, [handleNovelSearch, handleChapterSearch]);

    // Clear Error
    useEffect(() => {
        if (error !== null) {
            const timer = setTimeout(() => {
                setError(null);
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error, setError, setLoading]);

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
                                to={`/novels/${novelTitle}/${prevChapter.title}`}
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
                                to={`/novels/${novelTitle}/${nextChapter.title}`}
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
                    to={`/novels/${novelTitle}`}
                />
            </div>
        );
    };

    return (
        <div className="max-w-5xl w-full px-12 flex flex-col flex-nowrap">
            {error ? <ErrorAlert error={error} /> : loading && <LoadingAlert />}
            {chapter && novel && (
                <div className="flex flex-col justify-center items-center">
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

                    <p className="max-w-2xl text-lg content">
                        {chapter.content}
                    </p>
                    <NavigationButtons
                        prevChapter={prevChapter}
                        nextChapter={nextChapter}
                    />
                </div>
            )}
        </div>
    );
};

export default ChapterPage;
