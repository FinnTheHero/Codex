import React from "react";
import { Link } from "react-router-dom";
import { ChapterCardProps, NovelCardProps } from "../Types/types";
import FormattedTime from "./FormattedTime";
import useSWR from "swr";
import { useContent } from "../Contexts/ContentContext";

const ChapterCard: React.FC<NovelCardProps> = ({ index }) => {
    const { novel, chapter, setChapter, chapters } = useContent();

    if (!novel) return null;

    if (!chapter && chapters.length >= 0) {
        setChapter(chapters[index]);
    }

    return (
        <div className="my-3 py-2 border-b border-zinc-800">
            {chapter && (
                <div>
                    <h2 className="text-2xl">{chapter.title}</h2>
                    <div className="mx-1 mt-1 flex justify-between">
                        <FormattedTime
                            date={chapter.upload_date}
                            classname={"link"}
                            popover_text={"Uploaded"}
                        />
                        <Link
                            to={`/novels/${novel.id}/${chapter.id}`}
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
