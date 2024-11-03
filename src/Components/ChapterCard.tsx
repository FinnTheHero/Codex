import React from "react";
import { Link } from "react-router-dom";
import { ChapterCardProps } from "../Types/types";
import FormattedTime from "./FormattedTime";

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, novel }) => {
    return (
        <div className="my-3 py-2 border-b border-zinc-800">
            <h2 className="text-2xl">{chapter.title}</h2>
            <div className="mx-1 mt-1 flex justify-between">
                <FormattedTime
                    date={chapter.upload_date}
                    classname={"link"}
                    popover_text={"Uploaded"}
                />
                <Link
                    to={`/novels/${novel.title}/${chapter.title}`}
                    className="mx-1 link "
                >
                    [Read]
                </Link>
            </div>
        </div>
    );
};

export default ChapterCard;
