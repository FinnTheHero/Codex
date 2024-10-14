import React from "react";
import { Chapter } from "../Types/types";

const ChapterCard: React.FC<Chapter> = ({
    title,
    author,
    description,
    creation_date,
    update_date,
    upload_date,
    content,
}) => {
    return (
        <div className="my-3 py-2 border-b border-zinc-800">
            <h1>{title}</h1>
            <h1>{description}</h1>
            <h1>{update_date}</h1>
        </div>
    );
};

export default ChapterCard;
