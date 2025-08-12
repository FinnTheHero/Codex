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
import { useError } from "../Contexts/ErrorContext";
import { useUser } from "../Contexts/UserContext";
import { useNotification } from "../Contexts/NotificationContext";
import { updateNovel } from "../Services/updateServices";
import { Novel } from "../Types/types";
import { useContent } from "../Contexts/ContentContext";

const EditNovelPage = () => {
    const { id_novel } = useParams();

    const { user } = useUser();
    const { addError } = useError();
    const { setNotification } = useNotification();
    const { novel, refreshAllNovels } = useContent();

    const [newNovelTitle, setNewNovelTitle] = useState<string>("");
    const [newNovelDescription, setNewNovelDescription] = useState<string>("");

    const navigate = useNavigate();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewNovelTitle(e.target.value);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNewNovelDescription(e.target.value);
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
                refreshAllNovels();
                return navigate(`/novels/${novel.id}`);
            }
        } catch (err) {
            addError("Error updating novel: " + err);
        }
    };

    return (
        <div className="max-w-4xl w-full h-full px-8 lg:px-12 flex flex-row flex-wrap">
            <div className="w-full h-full flex justify-center mb-12 lg:mb-0">
                {novel && (
                    <form className="flex flex-col items-start justify-between flex-nowrap w-full h-full mb-12">
                        <label className="w-full mb-16 flex flex-wrap justify-center items-center text-center text-2xl">
                            <h2 className="link">[{novel.title}]</h2>
                            <h2 className="mx-4">By</h2>
                            <h2 className="content">[{novel.author}]</h2>
                        </label>

                        <div className="w-full my-16 flex flex-row flex-wrap justify-start items-center">
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

                        <div className="h-full flex flex-col flex-nowrap w-full">
                            <label className="text-xl font-bold mb-2">
                                Description
                            </label>

                            {/*TODO: MDX Content(Along with submit button) goes OVER the footer and in process extends the screen size somehow, need to fix that! */}
                            <div className="h-full flex flex-row flex-nowrap mx-2">
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
