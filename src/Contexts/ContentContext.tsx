import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import {
    Chapter,
    ContentContextType,
    Novel,
    PaginationResponse,
} from "../Types/types";
import { useError } from "./ErrorContext";
import { useLoading } from "./LoadingContext";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { axiosFetcher } from "../Services/apiService";
import { useEffect } from "react";
import { HandleErr } from "../Services/errorHandler";
import axios from "axios";

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { addError } = useError();
    const { setLoading } = useLoading();

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [chapterId, setChapterId] = useState<string | null>(null);
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [novel, setNovel] = useState<Novel | null>(null);

    const key_n = `/all`;
    const key_c = novel && chapterId && `/${novel.id}/${chapterId}`;

    const getKey = (
        pageIndex: number,
        previousPageData: PaginationResponse | null,
    ) => {
        if (!novel) return null;

        if (pageIndex === 0) {
            return `/${novel.id}/chapters?order=desc`;
        }

        if (previousPageData && !previousPageData.next_cursor) return null;

        return `/${novel.id}/chapters?cursor=${previousPageData?.next_cursor ?? ""}&order=desc`;
    };

    const {
        data: data_inf,
        error: error_inf,
        mutate: mutateInfinite,
        isLoading: infiniteLoading,
        size,
        setSize,
    } = useSWRInfinite<PaginationResponse>(getKey, axiosFetcher);

    const {
        data: data_n,
        error: error_n,
        mutate: mutateNovels,
        isLoading: novelsLoading,
    } = useSWR<{ novels: Novel[] }>(key_n, axiosFetcher);

    const {
        data: data_c,
        error: error_c,
        mutate: mutateChapter,
        isLoading: chapterLoading,
    } = useSWR<{ chapters: Chapter[] }>(key_c, axiosFetcher);

    useEffect(() => {
        setLoading(novelsLoading || chapterLoading || infiniteLoading);
    }, [novelsLoading, chapterLoading, infiniteLoading]);

    useEffect(() => {
        if (error_n && axios.isAxiosError(error_n)) {
            switch (error_n.response?.status) {
                case 401:
                    return addError(`Unauthorized`);
                case 404:
                    return addError(`Novel not found`);
                case 500:
                    return addError(`Internal server error`);
                default:
                    return addError(`An error occurred while fetching Novels`);
            }
        }
        setLoading(false);
    }, [error_n]);

    useEffect(() => {
        const allChapters = data_inf
            ? data_inf.flatMap((page) => page.chapters)
            : [];

        const sortedChapters = allChapters.sort((a, b) => {
            return b.title.localeCompare(a.title, undefined, {
                numeric: true,
                sensitivity: "base",
            });
        });

        setChapters(sortedChapters);
    }, [data_inf]);

    useEffect(() => {
        if (data_c) {
            setChapters(data_c.chapters);
        }
    }, [data_c]);

    useEffect(() => {
        if (chapterId) {
            setChapter(
                chapters.find((chapter) => chapter.id === chapterId) || null,
            );
            setChapterId(null);
        }
    }, [chapterId, chapters, setChapterId]);

    const hasMore = useMemo(() => {
        return data_inf && data_inf.length > 0
            ? data_inf[data_inf.length - 1]?.next_cursor !== ""
            : false;
    }, [data_inf]);

    const loadMore = useCallback(async () => {
        if (hasMore && !infiniteLoading) {
            await setSize((prev) => prev + 1);
        }
    }, [hasMore, infiniteLoading, setSize]);

    async function refreshAllNovels() {
        try {
            await mutateNovels();
        } catch (err) {
            HandleErr(err);
        }
    }

    return (
        <ContentContext.Provider
            value={{
                chapter,
                setChapter,
                chapters: chapters ?? [],
                novels: data_n?.novels ?? [],
                novel,
                setNovel,
                refreshAllNovels,
                loadMore,
                hasMore,
                setChapterId,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
};
export const useContent = (): ContentContextType => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error("useContent must be used within a ContentProvider!");
    }
    return context;
};
