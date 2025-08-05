import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { useContent } from "../Contexts/ContentContext";
import { useError } from "../Contexts/ErrorContext";
import { useNotification } from "../Contexts/NotificationContext";
import { useUser } from "../Contexts/UserContext";
import { createNovel } from "../Services/createService";
import { Novel } from "../Types/types";

const UploadNovelPage = () => {
    const { user } = useUser();
    const { addError } = useError();
    const { setNotification } = useNotification();
    const { refreshAllNovels } = useContent();

    const [novel, setNovel] = useState<Novel>({
        id: "",
        author: "",
        title: "",
        description: "",
        creation_date: "",
        upload_date: "",
        update_date: "",
    });

    const navigate = useNavigate();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNovel({ ...novel, title: e.target.value });
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNovel({ ...novel, description: e.target.value });
    };

    const handleUpdateNovel = async () => {
        try {
            if (!user) {
                addError("User not logged in");
                return;
            }

            let n: Novel = {
                id: "",
                author: user.username || "",
                title: novel.title,
                description: novel.description,
                creation_date: "",
                upload_date: "",
                update_date: "",
            };
            const response = await createNovel(n);
            setNotification(response.message);
            refreshAllNovels();
            return navigate(`/novels/`);
        } catch (err) {
            addError("Error updating novel: " + err);
        }
    };

    return (
        <div className="max-w-4xl w-full h-full px-8 lg:px-12 flex flex-row flex-wrap">
            <div className="w-full h-full flex justify-center mb-12 lg:mb-0">
                {user && (
                    <form className="flex flex-col items-start justify-between flex-nowrap w-full h-full">
                        <label className="w-full mb-16 flex flex-wrap justify-center items-center text-center text-2xl">
                            <h2 className="link">
                                [{novel?.title || "Untitled"}]
                            </h2>
                            <h2 className="mx-4">By</h2>
                            <h2 className="content">[{user.username}]</h2>
                        </label>

                        <div className="w-full my-16 flex flex-row flex-wrap justify-start items-center">
                            <div className="w-full flex flex-col flex-nowrap">
                                <div className="w-full flex flex-row flex-nowrap mx-2">
                                    <label className="text-xl font-bold">
                                        Title
                                    </label>
                                </div>
                            </div>

                            <div className="border-b border-zinc-800 w-full my-6 mx-4">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="search-input w-full"
                                    value={novel.title}
                                    onChange={handleTitleChange}
                                    placeholder={String("Title")}
                                />
                            </div>
                        </div>

                        <div className="w-full my-16 flex flex-row flex-wrap justify-start items-center">
                            <div className="w-full flex flex-col flex-nowrap">
                                <div className="w-full flex flex-row flex-nowrap mx-2">
                                    <label className="text-xl font-bold">
                                        Description
                                    </label>
                                </div>
                            </div>

                            <div className="border-b border-zinc-800 w-full my-6 mx-4">
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    className="search-input w-full"
                                    value={novel.description}
                                    onChange={handleDescriptionChange}
                                    placeholder={String("Description")}
                                />
                            </div>
                        </div>

                        <div className="w-full flex justify-center mt-12">
                            <h2
                                className="link text-2xl cursor-pointer"
                                onClick={handleUpdateNovel}
                            >
                                [Submit]
                            </h2>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UploadNovelPage;
