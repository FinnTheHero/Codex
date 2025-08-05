import React, { useState } from "react";
import ePub, { Book } from "epubjs";
import { useError } from "../Contexts/ErrorContext";
import { useNotification } from "../Contexts/NotificationContext";
import { useLoading } from "../Contexts/LoadingContext";
import { Chapter, Novel } from "../Types/types";
import axios from "axios";
import api from "../Services/apiService";
import { createNovel } from "../Services/createService";
import { useContent } from "../Contexts/ContentContext";
import { HandleErr } from "../Services/errorHandler";
import TurndownService from "turndown";

const UploadEPUBPage = () => {
    const [file, setFile] = useState<File | null>(null);

    const { addError } = useError();
    const { setLoading } = useLoading();
    const { setNotification } = useNotification();
    const { novels, refreshAllNovels } = useContent();

    // HTML to Markdown conversion rules - Requires further testing and feedback
    const turndown = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
        bulletListMarker: "-",
    });
    turndown.remove(["img", "script", "style", "meta"]);
    turndown.addRule("skipSynopsisParas", {
        filter: (node) =>
            node.nodeName === "P" && / TL /.test(node.textContent || ""),
        replacement: () => "",
    });

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }
        setFile(event.target.files[0]);
        setNotification("File Set");
    };

    const handleUpload = async () => {
        if (!file) {
            setLoading(false);
            return addError("No file selected");
        }

        setNotification(`Processing ${file.name}`);
        setLoading(true);

        const arrayBuffer = await file.arrayBuffer();
        const book: Book = ePub(arrayBuffer);

        try {
            await book.ready;
            await book.loaded.spine;
        } catch (error) {
            setLoading(false);
            return addError("Error opening file");
        }

        const metadata = await book.loaded.metadata;
        const navigation = await book.loaded.navigation;

        const chapters: Chapter[] = [];
        book.spine.each(async (section: any) => {
            await section.load(book.load.bind(book));
            const html = await section.render();
            console.log(html);
            const markdown = turndown.turndown(html);
            console.log(markdown);
            await section.unload();
        });

        console.log(navigation);
        console.log(book);
        console.log(metadata);

        setNotification("Creating novel...");

        const novel: Novel = {
            id: "",
            title: metadata.title || "Untitled",
            author: metadata.creator || "Unknown",
            description: metadata.description || "",
            creation_date: "",
            update_date: "",
            upload_date: "",
        };

        const response = await createNovel(novel);
        setNotification(response);
        setLoading(false);

        setNotification("Fetching Novel ID...");
        setLoading(true);

        await refreshAllNovels();
        const id = novels.find((novel) => novel.title === metadata.title)?.id;

        if (!id) {
            setLoading(false);
            return addError("Novel not found");
        }
    };

    return (
        <div className="flex flex-col flex-nowrap items-center justify-evenly text-center text-2xl">
            <p className="content">
                Upload EPUB file to parse Novel and Chapters directly
            </p>
            <div className="flex flex-col flex-nowrap justify-center items-center">
                <label
                    htmlFor="epub-picker"
                    className="link cursor-pointer mb-6"
                >
                    [Pick EPUB File]
                </label>
                <input
                    id="epub-picker"
                    className="hidden"
                    type="file"
                    accept=".epub"
                    onChange={handleFileChange}
                />
                <label className="">{file?.name}</label>
            </div>
            <button className="link" onClick={handleUpload}>
                [Upload]
            </button>
        </div>
    );
};

export default UploadEPUBPage;
