import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    BoldItalicUnderlineToggles,
    diffSourcePlugin,
    DiffSourceToggleWrapper,
    headingsPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    quotePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    UndoRedo,
} from "@mdxeditor/editor";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchHandler } from "../Components/SearchHandler";
import { useError } from "../Contexts/ErrorContext";
import { useUser } from "../Contexts/UserContext";
import { Chapter, Novel } from "../Types/types";

const EditChapterPage = () => {
    const { novelTitle } = useParams();
    const { chapterTitle } = useParams();

    const { addError } = useError();
    const { user } = useUser();

    const [novel, setNovel] = useState<Novel>();
    const [chapter, setChapter] = useState<Chapter>();

    const [newChapterTitle, setNewChapterTitle] = useState<string>("");
    const [newChapterContent, setNewChapterContent] = useState<string>("");

    const { searchNovelHandler, searchChapterHandler } = useSearchHandler();

    const handleChapterSearch = useCallback(() => {
        if (novelTitle && chapterTitle) {
            searchChapterHandler({
                id_novel: novelTitle,
                common: { setChapter },
                id_chapter: chapterTitle,
            });
        } else {
            addError("Novel/Chapter title not found!");
        }
    }, [novelTitle, searchNovelHandler]);

    const handleNovelSearch = useCallback(() => {
        if (novelTitle) {
            searchNovelHandler({
                id_novel: novelTitle,
                common: { setNovel },
            });
        } else {
            addError("Novel/Chapter title not found!");
        }
    }, [novelTitle, searchNovelHandler]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let title = e.target.value;
        setNewChapterTitle(title);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let description = e.target.value;
        setNewChapterContent(description);
    };

    useEffect(() => {
        handleNovelSearch();
        handleChapterSearch();
    }, []);

    return (
        <div className="max-w-4xl w-full h-full px-8 lg:px-12 flex flex-row flex-wrap">
            <div className="w-full h-full flex justify-center mb-12 lg:mb-0">
                {novel && chapter && (
                    <form className="flex flex-col items-start justify-between flex-nowrap w-full h-full">
                        <label className="w-full mb-16 flex justify-center text-xl">
                            Currently Editing
                            <h2 className="mx-2 content">[Chapter]</h2>
                            <h2 className="link">[{chapter.title}]</h2>
                        </label>

                        <div className="w-full my-14 flex flex-row flex-nowrap justify-between items-center">
                            <div className="flex flex-col flex-nowrap w-full">
                                <label className="text-xl font-bold">
                                    Title
                                </label>
                                <div className="flex flex-row flex-nowrap mx-2 w-full">
                                    <div className="text-lg flex justify-center items-center">
                                        <label className="text-nowrap">
                                            {chapter.title}
                                        </label>
                                    </div>

                                    <h2 className="mx-4 flex items-center">
                                        <FontAwesomeIcon
                                            size="xs"
                                            icon={faArrowRight}
                                        />
                                    </h2>

                                    <div className="border-b border-zinc-800 w-full">
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="text-nowrap search-input mb-1 w-full"
                                            onChange={handleTitleChange}
                                            placeholder={String(
                                                "New " + chapter.title,
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col flex-nowrap w-full">
                            <label className="text-xl font-bold mb-2">
                                Content
                            </label>

                            <div className="flex flex-row flex-nowrap mx-2">
                                <div className="w-full">
                                    <MDXEditor
                                        markdown={String(chapter.content)}
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
                                        onChange={setNewChapterContent}
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

export default EditChapterPage;
