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
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useError } from "../Contexts/ErrorContext";
import { useNotification } from "../Contexts/NotificationContext";
import { useUser } from "../Contexts/UserContext";
import { updateChapter } from "../Services/updateServices";
import { Chapter, Novel } from "../Types/types";

const EditChapterPage = () => {
    const { id_novel } = useParams();
    const { id_chapter } = useParams();

    const { setNotification } = useNotification();
    const { addError } = useError();
    const { user } = useUser();

    const [novel, setNovel] = useState<Novel>();
    const [chapter, setChapter] = useState<Chapter>();

    const [newChapterTitle, setNewChapterTitle] = useState<string>("");
    const [newChapterContent, setNewChapterContent] = useState<string>("");

    const navigate = useNavigate();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let title = e.target.value;
        setNewChapterTitle(title);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let description = e.target.value;
        setNewChapterContent(description);
    };

    const handleUpdateChapter = async () => {
        try {
            if (novel && chapter) {
                let c: Chapter = {
                    id: chapter.id,
                    title: newChapterTitle,
                    content: newChapterContent,
                    update_date: "",
                };
                const response = await updateChapter(novel.id, c);
                setNotification(response.message);
                navigate(`/novels/${novel.id}/${chapter.id}`);
            }
        } catch (err) {
            addError("Error updating novel: " + err);
        }
    };

    return (
        <div className="max-w-4xl w-full h-full px-8 lg:px-12 flex flex-row flex-wrap">
            <div className="w-full h-full flex justify-center mb-12 lg:mb-0">
                {novel && chapter && (
                    <form className="flex flex-col items-start justify-between flex-nowrap w-full h-full">
                        <label className="w-full mb-16 flex justify-center text-2xl">
                            <h2 className="link">[{chapter.title}]</h2>
                            <h2 className="mx-4">From</h2>
                            <Link className="link" to={`/novels/${novel.id}`}>
                                [{novel.title}]
                            </Link>
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
                                                [{chapter.title}]
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
                                                [{newChapterTitle}]
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
                        <div className="w-full flex justify-center mt-12">
                            <h2
                                className="link text-2xl cursor-pointer"
                                onClick={handleUpdateChapter}
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

export default EditChapterPage;
