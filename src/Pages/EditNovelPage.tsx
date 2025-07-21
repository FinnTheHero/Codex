import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@mdxeditor/editor";
import {
    MDXEditor,
    UndoRedo,
    BoldItalicUnderlineToggles,
    toolbarPlugin,
    headingsPlugin,
    thematicBreakPlugin,
    linkPlugin,
    quotePlugin,
    DiffSourceToggleWrapper,
    markdownShortcutPlugin,
    listsPlugin,
    diffSourcePlugin,
} from "@mdxeditor/editor";
import { useCallback, useEffect, useState } from "react";
import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";
import { useSearchHandler } from "../Components/SearchHandler";
import { useError } from "../Contexts/ErrorContext";
import { useUser } from "../Contexts/UserContext";
import { useNotification } from "../Contexts/NotificationContext";
import { updateNovel } from "../Services/updateServices";
import { Novel } from "../Types/types";

const EditNovelPage = () => {
    const { id_novel } = useParams();
    const { chapterTitle } = useParams();

    const { setNotification } = useNotification();
    const { addError } = useError();
    const { user } = useUser();

    const [novel, setNovel] = useState<Novel>();

    const [newNovelTitle, setNewNovelTitle] = useState<string>("");
    const [newNovelDescription, setNewNovelDescription] = useState<string>("");

    const { searchNovelHandler } = useSearchHandler();

    const navigate = useNavigate();

    const handleNovelSearch = useCallback(() => {
        if (id_novel) {
            searchNovelHandler({
                id_novel,
                common: { setNovel },
            });
        } else {
            addError("Novel title not found!");
        }
    }, [id_novel, searchNovelHandler]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let title = e.target.value;
        setNewNovelTitle(title);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        let description = e.target.value;
        setNewNovelDescription(description);
    };

    const handleUpdateNovel = async () => {
        try {
            if (novel) {
                let n: Novel = {
                    id: novel.id,
                    author: "",
                    title: newNovelTitle,
                    description: newNovelDescription,
                    creation_date: "",
                    upload_date: "",
                    update_date: "",
                };
                const response = await updateNovel(n);
                setNotification(response.message);
                navigate(`/novels/${novel.id}`);
            }
        } catch (err) {
            addError("Error updating novel: " + err);
        }
    };

    useEffect(() => {
        handleNovelSearch();
    }, [handleNovelSearch]);

    return (
        <div className="max-w-4xl w-full h-full px-8 lg:px-12 flex flex-row flex-wrap">
            <div className="w-full h-full flex justify-center mb-12 lg:mb-0">
                {novel && (
                    <form className="flex flex-col items-start justify-between flex-nowrap w-full h-full">
                        <label className="w-full mb-16 flex flex-wrap justify-center items-center text-center text-xl">
                            <h2 className="link ml-3 text-2xl">
                                [{novel.title}]
                            </h2>
                            <h2 className="mx-4">By</h2>
                            <h2 className="content text-2xl">
                                [{novel.author}]
                            </h2>
                        </label>

                        <div className="w-full my-14 flex flex-row flex-wrap justify-start items-center">
                            <div className="w-full flex flex-col flex-nowrap">
                                <div className="w-full flex flex-row flex-nowrap mx-2">
                                    <label className="text-xl font-bold">
                                        Title
                                    </label>

                                    <div className="w-full flex flex-row flex-wrap justify-evenly">
                                        <div className="ml-8 text-lg flex justify-center items-center">
                                            <label className="link">
                                                [{novel.title}]
                                            </label>
                                        </div>

                                        <h2 className="mx-4 flex items-center">
                                            <FontAwesomeIcon
                                                size="xs"
                                                icon={faArrowRight}
                                            />
                                        </h2>

                                        <h2>
                                            <label className="link text-lg flex justify-center items-center">
                                                [{newNovelTitle}]
                                            </label>
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-zinc-800 w-full my-6 mx-4">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="search-input w-full"
                                    onChange={handleTitleChange}
                                    placeholder={String("New " + novel.title)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col flex-nowrap w-full">
                            <label className="text-xl font-bold mb-2">
                                Description
                            </label>

                            <div className="flex flex-row flex-nowrap mx-2">
                                <div className="w-full">
                                    <MDXEditor
                                        markdown={String(novel.description)}
                                        contentEditableClassName="prose"
                                        plugins={[
                                            headingsPlugin(),
                                            toolbarPlugin({
                                                toolbarClassName: "dark-editor",
                                                toolbarContents: () => (
                                                    <>
                                                        <DiffSourceToggleWrapper>
                                                            <UndoRedo />
                                                            <BoldItalicUnderlineToggles />
                                                        </DiffSourceToggleWrapper>
                                                    </>
                                                ),
                                            }),
                                            linkPlugin(),
                                            listsPlugin(),
                                            quotePlugin(),
                                            diffSourcePlugin(),
                                            thematicBreakPlugin(),
                                            markdownShortcutPlugin(),
                                        ]}
                                        onChange={setNewNovelDescription}
                                    />
                                </div>
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

export default EditNovelPage;
