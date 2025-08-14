import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import ChapterCard from "../Components/ChapterCard";
import FormattedTime from "../Components/FormattedTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GoBackButton from "../Components/GoBackButton";
import { useUser } from "../Contexts/UserContext";
import { useContent } from "../Contexts/ContentContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { AnimatePresence } from "framer-motion";
import { ComponentAnimationWrapper } from "../Components/ComponentAnimationWrapper";
import { useInView } from "react-intersection-observer";
import { useLoading } from "../Contexts/LoadingContext";
import { Popover } from "react-tiny-popover";

const NovelPage = () => {
    const { id_novel } = useParams();

    const [hideDescription, setHideDescription] = useState(false);
    const [isBackPopoverOpen, setIsBackPopoverOpen] = useState(false);

    const { user } = useUser();
    const { loading, setLoading } = useLoading();
    const { novel, setNovel, novels, chapters, loadMore, hasMore, chapter } =
        useContent();

    const { ref: loadMoreRef, inView } = useInView({
        threshold: 0,
        rootMargin: "500px",
        triggerOnce: false,
    });

    useEffect(() => {
        if (!novel) {
            setNovel(novels.find((novel) => novel.id === id_novel) || null);
        }
    }, [novels, setNovel, id_novel]);

    useEffect(() => {
        if (!inView || !hasMore || loading) return;

        const timeoutId = setTimeout(() => {
            setLoading(true);
            loadMore();
        }, 300);

        return () => {
            setLoading(false);
            clearTimeout(timeoutId);
        };
    }, [inView, hasMore, loadMore]);

    return (
        <div className="lg:max-w-6xl w-full lg:px-12 flex flex-col flex-nowrap justify-between items-center">
            <div className="w-full flex flex-row flex-wrap justify-between">
                <div className="w-full md:w-3/5 flex flex-col flex-nowrap justify-between">
                    {novel && (
                        <div className="w-full flex flex-col flex-nowrap justify-between">
                            {user &&
                                (user.username === novel.author ||
                                    user.type === "Admin") && (
                                    <div className="w-full flex items-center justify-center mb-6">
                                        <Link
                                            to={`/dashboard/edit/${novel.id}`}
                                            className="text-lg content"
                                        >
                                            [Edit Novel]
                                        </Link>
                                    </div>
                                )}
                            <div className="flex flex-col flex-nowrap w-full">
                                <h2 id="novel-id" className="text-4xl">
                                    {novel.title}
                                </h2>
                                <h2 className="ml-3 text-1xl">
                                    By {novel.author}
                                </h2>
                                <p
                                    onClick={() => {
                                        setHideDescription(!hideDescription);
                                    }}
                                    className="mt-4 subtitle cursor-pointer"
                                >
                                    <AnimatePresence>
                                        <ComponentAnimationWrapper
                                            hidden={!hideDescription}
                                        >
                                            <div
                                                className={`${hideDescription ? "hidden" : "indent-5 leading-snug w-full"}`}
                                            >
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({
                                                            node,
                                                            ...props
                                                        }) => (
                                                            <p
                                                                className="mb-5"
                                                                {...props}
                                                            />
                                                        ),
                                                    }}
                                                    remarkPlugins={[remarkGfm]}
                                                    rehypePlugins={[rehypeRaw]}
                                                >
                                                    {"&gt; " +
                                                        novel.description}
                                                </ReactMarkdown>
                                            </div>
                                        </ComponentAnimationWrapper>

                                        <ComponentAnimationWrapper
                                            hidden={hideDescription}
                                        >
                                            <div
                                                className={`${!hideDescription ? "hidden" : "indent-5 leading-snug w-full"}`}
                                            >
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({
                                                            node,
                                                            ...props
                                                        }) => (
                                                            <p
                                                                className="mb-5"
                                                                {...props}
                                                            />
                                                        ),
                                                    }}
                                                    remarkPlugins={[remarkGfm]}
                                                    rehypePlugins={[rehypeRaw]}
                                                >
                                                    {"&gt; " +
                                                        novel.description.substring(
                                                            0,
                                                            25,
                                                        ) +
                                                        "..."}
                                                </ReactMarkdown>
                                            </div>
                                        </ComponentAnimationWrapper>
                                    </AnimatePresence>
                                </p>
                            </div>
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

                            <div className="">
                                {chapters &&
                                    chapters.length > 0 &&
                                    chapters.map((c, i) => (
                                        <ChapterCard
                                            chapter={c}
                                            index={i}
                                            key={c.id}
                                        />
                                    ))}
                            </div>
                            {hasMore ? (
                                <div
                                    ref={loadMoreRef}
                                    className="mt-12 w-full flex justify-center items-center text-center text-xl"
                                >
                                    <p className="link text-center">
                                        [Loading Chapters...]
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-12 w-full flex justify-center items-center text-center text-xl">
                                    <p className="link text-center">
                                        [No more chapters]
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <GoBackButton
                to="/novels/#root"
                className="link text-xl mt-16"
                desc="Novels"
            />
        </div>
    );
};

export default NovelPage;
