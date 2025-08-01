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
import rehypeRaw from "rehype-raw";
import { useUser } from "../Contexts/UserContext";
import { useContent } from "../Contexts/ContentContext";

const ChapterPage = () => {
    const { id_novel } = useParams();
    const { id_chapter } = useParams();

    const { user } = useUser();
    const { errors, addError } = useError();
    const { loading } = useLoading();

    const { chapter, novel, novels, chapters, setChapter, setNovel } =
        useContent();

    setChapter(chapters.find((chapter) => chapter.id === id_chapter) || null);
    setNovel(novels.find((novel) => novel.id === id_novel) || null);

    const NavigationButtons = () => {
        let index = chapters.findIndex((chapter) => chapter.id === id_chapter);

        return (
            <div className="max-w-2xl mt-20 text-xl flex flex-col flex-nowrap items-center justify-evenly w-full">
                <div className="flex flex-row flex-nowrap justify-between w-full">
                    {index > 0 ? (
                        <Popover text={chapters[index - 1].title}>
                            <Link
                                className="link"
                                to={`/novels/${id_novel}/${chapters[index - 1].id}`}
                            >
                                [Previous]
                            </Link>
                        </Popover>
                    ) : (
                        <h2 className="text-red-800 pointer-events-none">
                            [First]
                        </h2>
                    )}
                    {index < chapters.length - 1 ? (
                        <Popover text={chapters[index + 1].title}>
                            <Link
                                className="link"
                                to={`/novels/${id_novel}/${chapters[index + 1].id}`}
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
                    {user &&
                        (user.username == novel.author ||
                            user.type == "Admin") && (
                            <Link
                                to={`/dashboard/${novel.id}/${chapter.id}`}
                                className="w-full text-lg content text-end"
                            >
                                [Edit Chapter]
                            </Link>
                        )}
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

                    <ReactMarkdown
                        className="max-w-2xl mt-4 prose prose-lg font-sans leading-relaxed"
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {chapter.content}
                    </ReactMarkdown>

                    <NavigationButtons />
                </div>
            )}
        </div>
    );
};

export default ChapterPage;
