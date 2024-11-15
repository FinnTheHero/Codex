import { useParams } from "react-router-dom";
import { search } from "../Services/searchService";
import { useEffect, useState } from "react";
import { Chapter, Novel } from "../Types/types";
import ErrorAlert from "../Components/ErrorAlert";
import LoadingAlert from "../Components/LoadingAlert";
import ChapterCard from "../Components/ChapterCard";
import FormattedTime from "../Components/FormattedTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GoBackButton from "../Components/GoBackButton";

const NovelPage = () => {
    const { novelTitle } = useParams();

    const [novel, setNovel] = useState<Novel>();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            if (!novelTitle) {
                setError("Cant find novel title!");
                return;
            }

            handleSearch(novelTitle, "");
            handleSearch(novelTitle, "all");
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [novelTitle]);

    const handleSearch = async (title_novel: string, title_chapter: string) => {
        setError(null);
        setLoading(true);
        try {
            const data = await search(title_novel, title_chapter);
            if (data.chapters && data.chapters.length > 0) {
                setChapters(data.chapters);
                return;
            }

            if (data.novel) {
                setNovel(data.novel);
                return;
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div className="lg:max-w-6xl w-full px-2 lg:px-12 flex flex-col flex-nowrap justify-between items-center">
            {error ? <ErrorAlert error={error} /> : loading && <LoadingAlert />}

            <div className="w-full flex flex-row flex-wrap justify-between">
                <div className="w-full md:w-3/5 flex flex-col flex-nowrap justify-between">
                    {novel && (
                        <div className="flex flex-col flex-nowrap">
                            <h2 className="text-4xl">{novel.title}</h2>
                            <h2 className="ml-3 text-1xl">By {novel.author}</h2>
                            <p className="mt-2 subtitle text-">
                                {" > "} {novel.description}
                            </p>
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
