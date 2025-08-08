import React, { useState } from "react";
import ePub, { Book } from "epubjs";
import { useError } from "../Contexts/ErrorContext";
import { useNotification } from "../Contexts/NotificationContext";
import { useLoading } from "../Contexts/LoadingContext";
import { Chapter, Novel } from "../Types/types";
import { batchUploadChapters, createNovel } from "../Services/createService";
import { useContent } from "../Contexts/ContentContext";
import TurndownService from "turndown";
import { useNavigate } from "react-router-dom";

const UploadEPUBPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);

    const { addError } = useError();
    const { setLoading } = useLoading();
    const { setNotification } = useNotification();
    const { novels, refreshAllNovels, refreshAllChapters } = useContent();
    const navigate = useNavigate();

    // HTML to Markdown conversion rules - Requires further testing and feedback
    const turndown = new TurndownService({
        headingStyle: "setext",
        codeBlockStyle: "indented",
        bulletListMarker: "-",
    });
    turndown.remove(["img", "script", "style", "meta"]);
    turndown.addRule("skipTL", {
        filter: (node) =>
            node.nodeName === "P" && / TL note:/.test(node.textContent || ""),
        replacement: () => "",
    });
    turndown.addRule("skipSynopsis", {
        filter: (node) =>
            node.nodeName === "P" && / Synopsis /.test(node.textContent || ""),
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
        setProcessing(true);

        const arrayBuffer = await file.arrayBuffer();
        const book: Book = ePub(arrayBuffer);

        try {
            await book.ready;
            await book.loaded.spine;
        } catch (error) {
            setLoading(false);
            setProcessing(false);
            return addError("Error opening file");
        }

        setNotification("Creating novel...");
        const metadata = await book.loaded.metadata;
        const novel: Novel = {
            id: "",
            title: metadata.title || "Untitled",
            author: metadata.creator || "Unknown",
            description: turndown.turndown(metadata.description) || "",
            creation_date: "",
            update_date: "",
            upload_date: "",
        };

        const response = await createNovel(novel);
        const id = response.id;
        setNotification(`Novel created: ${String(response.message) || id}`);

        setNotification("Parsing Chapters...");
        const chapters: Chapter[] = [];

        // Add a counter to track completion
        let sectionsProcessed = 0;
        let totalSections = 0;

        // Count total sections first
        book.spine.each(() => {
            totalSections++;
        });

        setNotification(`Total sections to process: ${totalSections}`);

        // Create a promise that resolves when all sections are processed
        const allSectionsProcessed = new Promise<void>((resolve) => {
            if (totalSections === 0) {
                resolve();
                return;
            }

            book.spine.each(async (section: any, index: number) => {
                try {
                    setNotification(
                        `Processing section ${index + 1}/${totalSections}: ${section.href}`,
                    );

                    await section.load(book.load.bind(book));
                    const html = await section.render();
                    const markdown = turndown.turndown(html);

                    const chapter: Chapter = {
                        id: "",
                        author: novel.author,
                        title: section.title || `Chapter ${index + 1}`,
                        description: "",
                        content: markdown,
                        creation_date: "",
                        update_date: "",
                        upload_date: "",
                    };

                    chapters.push(chapter);
                    await section.unload();

                    sectionsProcessed++;
                    setNotification(
                        `Section ${index + 1} processed. Total chapters: ${chapters.length}`,
                    );

                    // Check if all sections are processed
                    if (sectionsProcessed === totalSections) {
                        setNotification(
                            `All ${totalSections} sections processed!`,
                        );
                        resolve();
                    }
                } catch (error) {
                    addError(
                        `Error processing section ${index + 1}: ${(error as Error).message}`,
                    );
                    sectionsProcessed++;

                    // Still resolve if all sections are processed (even with errors)
                    if (sectionsProcessed === totalSections) {
                        resolve();
                    }
                }
            });
        });

        // Wait for all sections to be processed
        await allSectionsProcessed;

        if (chapters.length === 0) {
            setLoading(false);
            setProcessing(false);
            return addError("No chapters were parsed from the EPUB file");
        }

        // Upload chapters in batches
        const batchSize = 100;
        const totalBatches = Math.ceil(chapters.length / batchSize);

        setNotification(
            `Starting upload: ${chapters.length} chapters in ${totalBatches} batches`,
        );

        for (let i = 0; i < totalBatches; i++) {
            const start = i * batchSize;
            const end = Math.min(start + batchSize, chapters.length);
            const batch = chapters.slice(start, end);

            setNotification(
                `Uploading batch ${i + 1}/${totalBatches}: chapters ${start + 1}-${end} (${batch.length} chapters)`,
            );

            setNotification(
                `Uploading chapters ${start + 1}-${end} of ${chapters.length}...`,
            );

            try {
                const result = await batchUploadChapters(id, batch);
                setNotification(`Batch ${i + 1} result: ${String(result)}`);
            } catch (error) {
                setLoading(false);
                setProcessing(false);
                return addError(
                    `Failed to upload batch ${i + 1}: ${(error as Error).message}`,
                );
            }
        }

        setLoading(false);
        setProcessing(false);
        await refreshAllNovels();
        await refreshAllChapters();
        return navigate(`/novels/${id}`);
    };

    return (
        <div className="max-w-6xl w-full max-h-screen h-full flex flex-row flex-wrap items-center justify-evenly text-center text-2xl">
            <div className="max-w-1/2 w-1/3 h-full flex flex-col flex-nowrap justify-center items-center">
                <div className="flex flex-col flex-nowrap justify-center text-start text-xl">
                    <h2 className="content mb-6">[EPUB Upload Guide]</h2>
                    <p
                        className={`flex flex-row flex-nowrap ${file ? "link" : ""}`}
                    >
                        {file && (
                            <input
                                className="mr-4"
                                type={"checkbox"}
                                checked={file ? true : false}
                            />
                        )}
                        <h2>1. Pick a file</h2>
                    </p>
                    <p
                        className={`flex flex-row flex-nowrap ${file && processing ? "link" : ""}`}
                    >
                        {file && processing && (
                            <input
                                className="mr-4"
                                type={"checkbox"}
                                checked={file && processing ? true : false}
                            />
                        )}
                        <h2>2. Upload file</h2>
                    </p>
                    <p
                        className={`flex flex-row flex-nowrap ${processing ? "link" : ""}`}
                    >
                        {processing && (
                            <input
                                className="mr-4"
                                type={"checkbox"}
                                checked={file && processing ? true : false}
                            />
                        )}
                        <h2>3. Wait for processing</h2>
                    </p>
                    <p
                        className={`flex flex-row flex-nowrap ${processing ? "link" : ""}`}
                    >
                        {processing && (
                            <input
                                className="mr-4"
                                type={"checkbox"}
                                checked={file && processing ? true : false}
                            />
                        )}
                        <h2>4. Wait for success/fail</h2>
                    </p>
                    <p className="subtitle mt-6 text-lg">
                        You will be automatically redirected to the Novel page
                        after the processing is complete.
                    </p>
                    <p className="subtitle mt-6 text-lg">
                        Chapter upload works in chunks of 100, uploading a large
                        number of chapters will take longer. Please be patient
                        and wait for the upload to complete. If you leave this
                        page it will complete partially or not at all.
                    </p>
                    <p className="subtitle mt-6 text-lg">
                        If you encounter any issues, please open issue on
                        GitHub.
                    </p>
                </div>
            </div>
            <div className="max-w-2/3 w-2/3 h-full flex flex-col flex-nowrap justify-center items-center">
                <p className="w-2/3 content">
                    Upload EPUB file to parse Novel and Chapters directly
                </p>
                <div className="my-12 flex flex-col flex-nowrap justify-center items-center">
                    <label
                        htmlFor="epub-picker"
                        className="link cursor-pointer mb-4"
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
                    <label>{file?.name}</label>
                </div>
                <button
                    className={`${processing ? "text-gray-800" : "link"}`}
                    onClick={handleUpload}
                    disabled={processing}
                >
                    [Upload]
                </button>
            </div>
        </div>
    );
};

export default UploadEPUBPage;
