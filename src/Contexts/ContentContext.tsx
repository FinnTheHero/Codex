import { createContext, ReactNode, useContext, useState } from "react";
import { Chapter, ContentContextType, Novel } from "../Types/types";
import { useError } from "./ErrorContext";
import { useLoading } from "./LoadingContext";
import { useNotification } from "./NotificationContext";
import useSWR from "swr";
import { axiosFetcher } from "../Services/apiService";
import { useEffect } from "react";

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { addError } = useError();
    const { setLoading } = useLoading();
    const { setNotification } = useNotification();

    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [novel, setNovel] = useState<Novel | null>(null);

    const key_n = `/all`;
    const key_c = novel ? `/${novel.id}/all` : null;

    const {
        data: data_n,
        error: error_n,
        mutate: mutateNovels,
        isLoading: novelsLoading,
    } = useSWR<{ novels: Novel[] }>(key_n);

    const {
        data: data_c,
        error: error_c,
        mutate: mutateChapters,
        isLoading: chaptersLoading,
    } = useSWR<{ chapters: Chapter[] }>(novel ? key_c : null);

    useEffect(() => {
        setLoading(novelsLoading || chaptersLoading);
    }, [novelsLoading, chaptersLoading]);

    useEffect(() => {
        if (error_n) addError(error_n);
        if (error_c) addError(error_c);
    }, [error_n, error_c]);

    async function refreshAllChapters() {
        mutateChapters();
    }

    async function refreshAllNovels() {
        mutateNovels();
    }

    return (
        <ContentContext.Provider
            value={{
                chapter,
                setChapter,
                chapters: data_c?.chapters ?? [],
                novels: data_n?.novels ?? [],
                novel,
                setNovel,
                refreshAllChapters,
                refreshAllNovels,
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
