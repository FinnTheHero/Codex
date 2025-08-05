import React, { useState } from "react";
import ePub, { Book } from "epubjs";
import { useError } from "../Contexts/ErrorContext";
import { useNotification } from "../Contexts/NotificationContext";
import { useLoading } from "../Contexts/LoadingContext";
import { Chapter, Novel } from "../Types/types";
import { batchUploadChapters, createNovel } from "../Services/createService";
import { useContent } from "../Contexts/ContentContext";
import TurndownService from "turndown";
import { Navigate, useNavigate } from "react-router-dom";

const UploadEPUBPage = () => {
    const [file, setFile] = useState<File | null>(null);

    const { addError } = useError();
    const { setLoading } = useLoading();
    const { setNotification } = useNotification();
    const { novels, refreshAllNovels, refreshAllChapters } = useContent();
    const navigate = useNavigate();

    // HTML to Markdown conversion rules - Requires further testing and feedback
    const turndown = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
        bulletListMarker: "-",
    });
    turndown.remove(["img", "script", "style", "meta"]);
    turndown.addRule("skipTL", {
        filter: (node) =>
            node.nodeName === "P" && / TL /.test(node.textContent || ""),
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

        const arrayBuffer = await file.arrayBuffer();
        const book: Book = ePub(arrayBuffer);

        try {
            await book.ready;
            await book.loaded.spine;
        } catch (error) {
            setLoading(false);
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
        console.log("✅ Novel created:", response);

        setNotification("Parsing Chapters...");
        const chapters: Chapter[] = [];

        // Add a counter to track completion
        let sectionsProcessed = 0;
        let totalSections = 0;

        // Count total sections first
        book.spine.each(() => {
            totalSections++;
        });

        console.log(`📚 Total sections to process: ${totalSections}`);

        // Create a promise that resolves when all sections are processed
        const allSectionsProcessed = new Promise<void>((resolve) => {
            if (totalSections === 0) {
                resolve();
                return;
            }

            book.spine.each(async (section: any, index: number) => {
                try {
                    console.log(
                        `🔄 Processing section ${index + 1}/${totalSections}: ${section.href}`,
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
                    console.log(
                        `✅ Section ${index + 1} processed. Total chapters: ${chapters.length}`,
                    );

                    // Check if all sections are processed
                    if (sectionsProcessed === totalSections) {
                        console.log(
                            `🎉 All ${totalSections} sections processed!`,
                        );
                        resolve();
                    }
                } catch (error) {
                    console.error(
                        `❌ Error processing section ${index + 1}:`,
                        error,
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

        console.log(`📋 Final chapters array length: ${chapters.length}`);
        console.log("📋 Sample chapters:", chapters.slice(0, 3));

        if (chapters.length === 0) {
            setLoading(false);
            return addError("No chapters were parsed from the EPUB file");
        }

        // Upload chapters in batches
        const batchSize = 100;
        const totalBatches = Math.ceil(chapters.length / batchSize);

        console.log(
            `🚀 Starting upload: ${chapters.length} chapters in ${totalBatches} batches`,
        );

        for (let i = 0; i < totalBatches; i++) {
            const start = i * batchSize;
            const end = Math.min(start + batchSize, chapters.length);
            const batch = chapters.slice(start, end);

            console.log(
                `📤 Uploading batch ${i + 1}/${totalBatches}: chapters ${start + 1}-${end} (${batch.length} chapters)`,
            );
            console.log("📤 Batch data:", batch.slice(0, 2)); // Log first 2 chapters of the batch

            setNotification(
                `Uploading chapters ${start + 1}-${end} of ${chapters.length}...`,
            );

            try {
                const result = await batchUploadChapters(id, batch);
                console.log(`✅ Batch ${i + 1} result:`, result);
            } catch (error) {
                console.error(`❌ Batch ${i + 1} failed:`, error);
                setLoading(false);
                return addError(`Failed to upload batch ${i + 1}: ${error}`);
            }
        }

        console.log("🎉 All batches uploaded successfully!");

        setLoading(false);
        await refreshAllNovels();
        await refreshAllChapters();
        return navigate(`/novels/${id}`);
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
