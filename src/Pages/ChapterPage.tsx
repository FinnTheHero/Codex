import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { search } from "../Services/searchService";
import { Chapter, Novel } from "../Types/types";
import ErrorAlert from "../Components/ErrorAlert";
import LoadingAlert from "../Components/LoadingAlert";
import FormattedTime from "../Components/FormattedTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GoBackButton from "../Components/GoBackButton";
import Popover from "../Components/Popover";

const ChapterPage = () => {
    const { novelTitle } = useParams();
    const { chapterTitle } = useParams();

    const [novel, setNovel] = useState<Novel | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [prevChapter, setPrevChapter] = useState<Chapter | null>(null);
    const [nextChapter, setNextChapter] = useState<Chapter | null>(null);

    const handleSearch = useCallback(
        async (title_novel: string, title_chapter: string) => {
            setError(null);
            setLoading(true);
            try {
                const data = await search(title_novel, title_chapter);
                if (data.chapter) {
                    setChapter(data.chapter);
                    return;
                }

                if (data.novel) {
                    setNovel(data.novel);
                    return;
                }

                if (data.chapters && data.chapters.length > 0) {
                    setChapters(data.chapters);
                    return;
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [],
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

    const handleWindowLoad = useCallback(() => {
        setError(null);
        setLoading(true);
        try {
            if (!novelTitle) {
                setError("Couldn't find novel title!");
                return;
            }

            if (!chapterTitle) {
                setError("Couldn't find chapter title!");
                return;
            }

            handleSearch(novelTitle, "");
            handleSearch(novelTitle, "all");
            handleSearch(novelTitle, chapterTitle);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [novelTitle, chapterTitle, handleSearch]);

    useEffect(() => {
        setPrevChapter(getPreviousChapter());
        setNextChapter(getNextChapter());
    }, [setPrevChapter, getPreviousChapter, setNextChapter, getNextChapter]);

    useEffect(() => {
        handleWindowLoad();
    }, [handleWindowLoad]);

    // Clear Error
    useEffect(() => {
        if (error !== null) {
            const timer = setTimeout(() => {
                setError(null);
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

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
