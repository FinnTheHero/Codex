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
import { useState } from "react";

const EditChapterPage = () => {
    const [markdown, setMarkdown] = useState("Hello world");

    return (
        <div className="max-w-7xl w-full px-8 lg:p-12 flex flex-row flex-wrap justify-center align-middle">
            <h1>Edit Chapter</h1>
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

export default EditChapterPage;
