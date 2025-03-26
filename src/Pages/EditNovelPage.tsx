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
import { Chapter, Novel } from "../Types/types";

interface NewNovel {
    title: string;
    description: string;
}

const EditNovelPage = () => {
    const { novelTitle } = useParams();
    const { chapterTitle } = useParams();

    const { addError } = useError();
    const { user } = useUser();

    const [markdown, setMarkdown] = useState("Hello world");
    const [novel, setNovel] = useState<Novel>();
    const [chapters, setChapters] = useState<Chapter[]>([]);

    const [newNovel, setNewNovel] = useState<NewNovel>({
        description: "",
        title: "",
    });

    const { searchChapterHandler, searchNovelHandler } = useSearchHandler();

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

    const handleChapterSearch = useCallback(() => {
        if (novelTitle && chapterTitle) {
            searchChapterHandler({
                title_novel: novelTitle,
                title_chapter: chapterTitle,
                setChapters,
            });
        }
    }, [novelTitle, chapterTitle, searchChapterHandler]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let temp: NewNovel = {
            description: "",
            title: "",
        };
        temp.title = e.target.value;
        setNewNovel(temp);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        let temp: NewNovel = {
            description: "",
            title: "",
        };
        temp.description = e.target.value;
        setNewNovel(temp);
    };

    useEffect(() => {
        handleNovelSearch();
        handleChapterSearch();
    }, [handleNovelSearch, handleChapterSearch]);

    return (
        <div className="max-w-7xl w-full px-8 lg:p-12 flex flex-row flex-wrap justify-center align-middle">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-6">
                {novel && newNovel && (
                    <form className="flex flex-col flex-nowrap ml-2 w-fit">
                        <h2 className="text-xl font-bold mb-12">
                            Author: {novel.author}
                        </h2>

                        <div className="mb-4 flex flex-col flex-wrap border-b border-zinc-800">
                            <label
                                htmlFor="title"
                                className="text-xl font-bold flex flex-row"
                            >
                                <h2 className="flex items-center">
                                    {novel.title}
                                </h2>
                                <h2
                                    className={`mx-2 flex items-center ${newNovel.title !== "" ? "visible" : "hidden"}`}
                                >
                                    <FontAwesomeIcon
                                        size="xs"
                                        icon={faArrowRight}
                                    />
                                </h2>
                                <h2>{newNovel.title}</h2>
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                onChange={handleTitleChange}
                                placeholder="Title"
                                className="search-input mb-2 mt-2 pl-2 "
                                required
                            />
                        </div>
                    </form>
                )}
            </div>

            <div className="w-full lg:w-1/2 border border-zinc-800 rounded-lg">
                <MDXEditor
                    markdown={markdown}
                    contentEditableClassName="prose"
                    plugins={[
                        headingsPlugin(),
                        toolbarPlugin({
                            toolbarClassName: "dark-editor",
                            toolbarContents: () => (
                                <>
                                    {" "}
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
                    onChange={setMarkdown}
                />
            </div>
        </div>
    );
};

export default EditNovelPage;
