import React from "react";
import { Link } from "react-router-dom";
import { ChapterCardProps, NovelCardProps } from "../Types/types";
import FormattedTime from "./FormattedTime";
import useSWR from "swr";
import { useContent } from "../Contexts/ContentContext";

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, index }) => {
    const { novel } = useContent();

    if (!novel) return null;

    const { setChapter } = useContent();

    return (
        <div className="my-3 py-2 border-b border-zinc-800">
            {chapter && (
                <div>
                    <h2 className="text-2xl">{chapter.title}</h2>
                    <div className="mx-1 mt-1 flex justify-between">
                        <FormattedTime
                            date={chapter.update_date}
                            classname={"link"}
                            popover_text={"Uploaded"}
                        />
                        <Link
                            onClick={() => {
                                setChapter(chapter);
                            }}
                            to={`/novels/${novel.id}/${chapter.id}#chapter-id`}
                            className="mx-1 link "
                        >
                            [Read]
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChapterCard;
