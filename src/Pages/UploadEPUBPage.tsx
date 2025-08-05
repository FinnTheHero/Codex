import React, { useState } from "react";
import ePub, { Book } from "epubjs";

const UploadEPUBPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState<boolean>(false);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }
        setFile(event.target.files[0]);
        setProcessing(true);

        // Continue here tomorrow
    };

    return (
        <div className="flex flex-col flex-nowrap items-center justify-evenly text-center text-2xl">
            <p className="content">
                Upload EPUB file to parse Novel and Chapters directly
            </p>
            <p className="link">[Pick EPUB file]</p>
        </div>
    );
};

export default UploadEPUBPage;
