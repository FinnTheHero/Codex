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
import { useState } from "react";

const EditNovelPage = () => {
    const [markdown, setMarkdown] = useState("Hello world");

    return (
        <div className="max-w-7xl w-full p-12 flex flex-col flex-nowrap justify-evenly items-center">
            <div className="w-full mb-16">
                <h2 className="text-xl font-bold text-start">Chapter 1</h2>
            </div>

            <div className="w-full border border-zinc-800 rounded-lg">
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
