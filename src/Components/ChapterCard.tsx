import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChapterCardProps, NovelCardProps } from "../Types/types";
import FormattedTime from "./FormattedTime";
import useSWR from "swr";
import { useContent } from "../Contexts/ContentContext";
import { getChapterProgress } from "../Services/cacheService";
import { Popover } from "react-tiny-popover";

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const { novel } = useContent();

    if (!novel) return null;

    const { setChapter } = useContent();

    const navigate = useNavigate();
    const handleClick = () => {
        setIsAnimating(true);

        setTimeout(() => {
            setIsAnimating(false);
            setChapter(chapter);
            return navigate(`/novels/${novel.id}/${chapter.id}#root`);
        }, 500);
    };

    const progress = getChapterProgress(String(chapter?.id ?? ""));

    return (
        <Popover
            isOpen={isPopoverOpen}
            positions={["bottom", "top", "left", "right"]}
            padding={10}
            reposition={true}
            boundaryInset={document.body.scrollHeight}
            content={
                <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded text-lg">
                    [{Math.round(progress?.progress ?? 0)}% Read]
                </div>
            }
        >
            <div
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => setIsPopoverOpen(false)}
                className="relative flex flex-col gap-6 p-2.5 my-2 overflow-x-clip"
            >
                {chapter && (
                    <div>
                        <h1 className="text-2xl text-nowrap overflow-hidden overflow-ellipsis">
                            {chapter.title}
                        </h1>
                        <div className="mx-1 mt-1 flex justify-between">
                            <FormattedTime
                                date={chapter.update_date}
                                classname={"link"}
                                popover_text={"Last Updated"}
                            />
                            <div
                                onClick={() => {
                                    handleClick();
                                }}
                                className="mx-1 link cursor-pointer"
                            >
                                [Read]
                            </div>
                        </div>
                    </div>
                )}
                {isAnimating && (
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-[#fab387]/15 to-[#fab387]/50 pointer-events-none rounded-xs"
                        style={{
                            animation: "fillAnimation 0.5s ease-out forwards",
                        }}
                    />
                )}

                <div className="absolute -bottom-1 left-0.5 right-0.5">
                    {/* Base bar */}
                    <div className="h-px bg-zinc-800" />

                    {/* Progress bar */}
                    <div
                        className="absolute inset-y-0 left-0 h-px bg-[#fab387] transition-all duration-300"
                        style={{ width: `${progress?.progress || 0}%` }}
                    />
                </div>
            </div>
        </Popover>
    );
};

export default ChapterCard;
