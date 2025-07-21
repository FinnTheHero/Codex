import { useCallback } from "react";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import {
    searchAllChapters,
    searchAllNovels,
    searchChapter,
    searchNovel,
} from "../Services/searchService";
import {
    SearchAllChaptersHandlerProps,
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
                id_novel,
                id_chapter,
                common: { setChapter },
            } = props;

            setLoading(true);

            try {
                const data = await searchChapter(id_novel, id_chapter);

                if (setChapter && data.chapter) {
                    setChapter(data.chapter);
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

    const searchAllChaptersHandler = useCallback(
        async (props: SearchAllChaptersHandlerProps) => {
            const {
                id_novel,
                common: { setChapters },
            } = props;

            setLoading(true);

            try {
                const data = await searchAllChapters(id_novel);

                if (setChapters && data.chapters) {
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
                id_novel,
                common: { setNovel },
            } = props;

            setLoading(true);

            try {
                const data = await searchNovel(id_novel);

                if (setNovel && data.novel) {
                    setNovel(data.novel);
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

    return {
        searchChapterHandler,
        searchAllChaptersHandler,
        searchNovelHandler,
        searchAllNovelsHandler,
    };
};
