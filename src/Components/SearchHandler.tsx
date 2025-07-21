import { useCallback } from "react";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import {
    searchAllNovels,
    searchChapter,
    searchNovel,
} from "../Services/searchService";
import {
    SearchAllNovelsHandlerProps,
    SearchChapterHandlerProps,
    SearchNovelHandlerProps,
} from "../Types/types";

export const useSearchHandler = () => {
    const { addError } = useError();
    const { setLoading } = useLoading();

    const searchChapterHandler = useCallback(
        async (props: SearchChapterHandlerProps) => {
            const {
                title_novel,
                title_chapter,
                common: { setChapter, setChapters },
            } = props;

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
                addError((err as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [addError, setLoading],
    );

    const searchNovelHandler = useCallback(
        async (props: SearchNovelHandlerProps) => {
            const {
                title_novel,
                common: { setNovel, setNovels },
            } = props;

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
                addError((err as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [addError, setLoading],
    );

    const searchAllNovelsHandler = useCallback(
        async (props: SearchAllNovelsHandlerProps) => {
            const {
                common: { setNovels },
            } = props;

            setLoading(true);

            try {
                const data = await searchAllNovels();

                if (setNovels && data.novels?.length > 0) {
                    setNovels(data.novels);
                    return data;
                }
            } catch (err) {
                addError((err as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [addError, setLoading],
    );

    return { searchChapterHandler, searchNovelHandler, searchAllNovelsHandler };
};
