import React from "react";
import { Chapter } from "../Types/types";

const ChapterCard: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
    return (
        <div className="my-3 py-2 border-b border-zinc-800">
            <h1>{chapter.title}</h1>
            <h1>{chapter.description}</h1>
            <h1>{chapter.update_date}</h1>
        </div>
    );
};

export default ChapterCard;
