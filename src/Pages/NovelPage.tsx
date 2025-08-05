import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Chapter, Novel } from "../Types/types";
import ChapterCard from "../Components/ChapterCard";
import FormattedTime from "../Components/FormattedTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GoBackButton from "../Components/GoBackButton";
import { useError } from "../Contexts/ErrorContext";
import { useUser } from "../Contexts/UserContext";
import { useContent } from "../Contexts/ContentContext";
import useSWR from "swr";
import { c } from "framer-motion/dist/types.d-Cjd591yU";

const NovelPage = () => {
    const { id_novel } = useParams();

    const [sortBy, setSortBy] = useState<"title" | "time">("title");

    const { user } = useUser();
    const { novel, setNovel, novels, chapters, refreshAllNovels } =
        useContent();

    useEffect(() => {
        setNovel(novels.find((novel) => novel.id === id_novel) || null);
    }, []);

    const sortedChapters = useMemo(() => {
        const copy = [...chapters];
        if (sortBy === "title") {
            return copy.sort((a, b) =>
                a.title.localeCompare(b.title, undefined, {
                    numeric: true,
                    sensitivity: "base",
                }),
            );
        }
        if (sortBy === "time") {
            return copy.sort(
                (a, b) =>
                    new Date(a.creation_date).getTime() -
                    new Date(b.creation_date).getTime(),
            );
        }
        return copy;
    }, [chapters, sortBy]);

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
                                    user.type === "Admin") && (
                                    <div>
                                        <Link
                                            to={`/dashboard/edit/${novel.id}`}
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

                            {sortedChapters &&
                                sortedChapters.length > 0 &&
                                sortedChapters.map((c, i) => (
                                    <ChapterCard
                                        chapter={c}
                                        index={i}
                                        key={i}
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
