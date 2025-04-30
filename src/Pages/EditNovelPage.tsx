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
import { useParams } from "react-router-dom";
import { useSearchHandler } from "../Components/SearchHandler";
import { useError } from "../Contexts/ErrorContext";
import { useUser } from "../Contexts/UserContext";
import { Novel } from "../Types/types";

const EditNovelPage = () => {
    const { novelTitle } = useParams();
    const { chapterTitle } = useParams();

    const { addError } = useError();
    const { user } = useUser();

    const [novel, setNovel] = useState<Novel>();

    const [newNovelTitle, setNewNovelTitle] = useState<string>("");
    const [newNovelDescription, setNewNovelDescription] = useState<string>("");

    const { searchNovelHandler } = useSearchHandler();

    const handleNovelSearch = useCallback(() => {
        if (novelTitle) {
            searchNovelHandler({
                title_novel: novelTitle,
                setNovel,
            });
        } else {
            addError("Novel title not found!");
        }
    }, [novelTitle, searchNovelHandler]);

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

    useEffect(() => {
        handleNovelSearch();
    }, [handleNovelSearch]);

    return (
        <div className="max-w-4xl w-full px-8 lg:p-12 flex flex-row flex-wrap justify-center align-middle">
            <div className="w-full flex justify-center mb-12 lg:mb-0 pr-6">
                {novel && (
                    <form className="flex flex-col items-start flex-nowrap w-full">
                        <label className="w-full flex justify-center text-xl">
                            Currently Editing
                            <h2 className="mx-2 content">[Novel]</h2>
                            <h2 className="link">[{novel.title}]</h2>
                        </label>

                        <div className="my-12 flex flex-col">
                            <p className="text-sm content">
                                Can't change the author!
                            </p>
                            <label className="text-xl font-bold">Author</label>
                            <label className="text-lg mx-2">
                                {novel.author}
                            </label>
                        </div>

                        <div className="mb-12 flex flex-col flex-nowrap">
                            <label className="text-xl font-bold">Title</label>
                            <div className="flex flex-row flex-nowrap mx-2">
                                <div className="text-lg flex justify-center items-center">
                                    <label>{novel.title}</label>
                                </div>

                                <h2 className="mx-4 flex items-center">
                                    <FontAwesomeIcon
                                        size="xs"
                                        icon={faArrowRight}
                                    />
                                </h2>

                                <div className="border-b border-zinc-800 w-fit">
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        className="search-input mb-1"
                                        onChange={handleTitleChange}
                                        placeholder={String(
                                            "New " + novel.title,
                                        )}
                                    />
                                </div>
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
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditNovelPage;
