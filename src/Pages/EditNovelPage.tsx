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
import { Chapter, Novel } from "../Types/types";

const EditNovelPage = () => {
    const { novelTitle } = useParams();
    const { chapterTitle } = useParams();

    const { setError } = useError();

    const [markdown, setMarkdown] = useState("Hello world");
    const [novel, setNovel] = useState<Novel>();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);

    const { searchChapterHandler, searchNovelHandler } = useSearchHandler();

    const handleNovelSearch = useCallback(() => {
        if (novelTitle) {
            searchNovelHandler({
                title_novel: novelTitle,
                setNovel,
            });
        } else {
            setError("Novel title not found!");
        }
    }, [novelTitle, searchNovelHandler, setError]);

    const handleChapterSearch = useCallback(
        (c?: string) => {
            if (novelTitle && chapterTitle) {
                searchChapterHandler({
                    title_novel: novelTitle,
                    title_chapter: c || chapterTitle,
                    setChapter,
                    setChapters,
                });
            }
        },
        [novelTitle, chapterTitle, searchChapterHandler],
    );

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (novel) {
            novel.title = e.target.value;
        }
    };

    useEffect(() => {
        handleNovelSearch();
        handleChapterSearch();
    }, [handleNovelSearch, handleChapterSearch]);

    return (
        <div className="max-w-7xl w-full px-8 lg:p-12 flex flex-row flex-wrap justify-center align-middle">
            <div className="w-full md:w-1/2 mb-16">
                {novel && (
                    <form className="flex flex-col flex-nowrap ml-2 w-fit">
                        <div className="mb-4 flex flex-col flex-nowrap border-b border-zinc-800">
                            <label
                                htmlFor="title"
                                className="text-xl font-bold"
                            >
                                Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                onChange={handleTitleChange}
                                placeholder={novel.title}
                                className="search-input mb-1 pl-1 "
                                required
                            />
                        </div>
                        <div className="mb-4 flex flex-col flex-nowrap border-b border-zinc-800">
                            <label
                                htmlFor="author"
                                className="text-xl font-bold"
                            >
                                Author
                            </label>
                            <input
                                id="author"
                                name="author"
                                type="text"
                                onChange={handleTitleChange}
                                placeholder={novel.author}
                                className="search-input mb-1 pl-1"
                                required
                            />
                        </div>
                        <div className="mb-4 flex flex-col flex-nowrap border-b border-zinc-800">
                            <label
                                htmlFor="description"
                                className="text-xl font-bold"
                            >
                                Description
                            </label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                onChange={handleTitleChange}
                                placeholder={novel.description}
                                className="search-input mb-1 pl-1"
                                required
                            />
                        </div>
                    </form>
                )}
            </div>

            <div className="w-full md:w-1/2 border border-zinc-800 rounded-lg">
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
