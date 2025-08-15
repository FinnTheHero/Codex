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

    const [status, setStatus] = useState<string[]>([]);

    const navigate = useNavigate();

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
            setProcessing(false);
            return addError("No file selected");
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        setProcessing(true);
        try {
            const response = await batchUploadChapters(formData);

            if (response?.status === 200) {
                setLoading(false);
                setProcessing(false);
                setNotification("Upload Successful");
                return navigate("/novels");
            } else {
                setLoading(false);
                setProcessing(false);
                addError("Upload Failed: " + response?.statusText);
                setStatus((prev) => ({
                    ...prev,
                    message: response?.statusText,
                }));
            }
        } catch (err) {
            setLoading(false);
            setProcessing(false);
            addError("Upload Failed: " + (err as Error).message);
            setStatus((prev) => ({
                ...prev,
                message: (err as Error).message,
            }));
        } finally {
            setLoading(false);
            setStatus((prev) => ({
                ...prev,
                message: "Upload Complete",
            }));
            setProcessing(false);
        }
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
                    className={`${processing ? "text-gray-800" : "link cursor-pointer"}`}
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
