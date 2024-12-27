import { useCallback } from "react";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import { searchChapter, searchNovel } from "../Services/searchService";
import {
    SearchChapterHandlerProps,
    SearchNovelHandlerProps,
} from "../Types/types";

export const useSearchHandler = () => {
    const { setError } = useError();
    const { setLoading } = useLoading();

    const searchChapterHandler = useCallback(
        async (props: SearchChapterHandlerProps) => {
            const { title_novel, title_chapter, setChapter, setChapters } =
                props;

            setError(null);
            setLoading(true);

            try {
                const data = await searchChapter(title_novel, title_chapter);

                if (setChapter && data.chapter) {
                    setChapter(data.chapter);
                    return data;
                }

                if (setChapters && data.chapters?.length > 0) {
                    setChapters(data.chapters);
                    return data;
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [setError, setLoading],
    );

    const searchNovelHandler = useCallback(
        async (props: SearchNovelHandlerProps) => {
            const { title_novel, setNovel, setNovels } = props;

            setError(null);
            setLoading(true);

            try {
                const data = await searchNovel(title_novel);

                if (setNovel && data.novel) {
                    setNovel(data.novel);
                    return data;
                }

                if (setNovels && data.novels?.length > 0) {
                    setNovels(data.novels);
                    return data;
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [setError, setLoading],
    );

    return { searchChapterHandler, searchNovelHandler };
};
