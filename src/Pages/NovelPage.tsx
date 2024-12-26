import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Chapter, Novel } from "../Types/types";
import ChapterCard from "../Components/ChapterCard";
import FormattedTime from "../Components/FormattedTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GoBackButton from "../Components/GoBackButton";
import { useError } from "../Contexts/ErrorContext";
import { useUser } from "../Contexts/UserContext";
import { useSearchHandler } from "../Components/SearchHandler";

const NovelPage = () => {
    const { novelTitle } = useParams();

    const { user } = useUser();
    const { setError } = useError();

    const [novel, setNovel] = useState<Novel>();
    const [chapters, setChapters] = useState<Chapter[]>([]);

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
            if (novelTitle && c) {
                searchChapterHandler({
                    title_novel: novelTitle,
                    title_chapter: c,
                    setChapters,
                });
            } else {
                setError("Novel or Chapter title not found!");
            }
        },
        [novelTitle, searchChapterHandler, setError],
    );

    useEffect(() => {
        handleNovelSearch();
        handleChapterSearch("all");
    }, [handleNovelSearch, handleChapterSearch]);

    return (
        <div className="lg:max-w-6xl w-full px-2 lg:px-12 flex flex-col flex-nowrap justify-between items-center">
            <div className="w-full flex flex-row flex-wrap justify-between">
                <div className="w-full md:w-3/5 flex flex-col flex-nowrap justify-between">
                    {novel && (
                        <div className="flex flex-row flex-nowrap justify-between">
                            <div className="flex flex-col flex-nowrap">
                                <h2 className="text-4xl">{novel.title}</h2>
                                <h2 className="ml-3 text-1xl">
                                    By {novel.author}
                                </h2>
                                <p className="mt-2 subtitle text-">
                                    {" > "} {novel.description}
                                </p>
                            </div>
                            {user &&
                                (user.username === novel.author ||
                                    user.type === "admin") && (
                                    <div>
                                        <Link
                                            to={`/dashboard/${novel.title}`}
                                            className="text-lg content"
                                        >
                                            [Edit Novel]
                                        </Link>
                                    </div>
                                )}
                        </div>
                    )}
                </div>
                <div className="w-full md:w-2/6 mt-8 md:mt-0 flex flex-col flex-wrap">
                    {novel && (
                        <div>
                            <div className="w-full flex flex-row flex-wrap justify-center">
                                <FormattedTime
                                    date={novel.creation_date}
                                    classname={"subtitle"}
                                    popover_text={"Created"}
                                />
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="content mx-3 pt-1"
                                />
                                <FormattedTime
                                    date={novel.update_date}
                                    classname={"content"}
                                    popover_text={"Last Updated"}
                                />
                            </div>

                            {chapters &&
                                chapters.length > 0 &&
                                chapters.map((chapter, index) => (
                                    <ChapterCard
                                        novel={novel}
                                        chapter={chapter}
                                        key={index}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <GoBackButton className={"text-xl mt-36 link"} to={"/novels/"} />
        </div>
    );
};

export default NovelPage;
