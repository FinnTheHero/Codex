import { createContext, ReactNode, useContext, useState } from "react";
import { Chapter, ContentContextType, Novel } from "../Types/types";
import { useError } from "./ErrorContext";
import { useLoading } from "./LoadingContext";
import useSWR from "swr";
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

    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [novel, setNovel] = useState<Novel | null>(null);

    const key_n = `/all`;
    const key_cs = novel ? `/${novel.id}/all` : null;

    const {
        data: data_n,
        error: error_n,
        mutate: mutateNovels,
        isLoading: novelsLoading,
    } = useSWR<{ novels: Novel[] }>(key_n, axiosFetcher);

    const {
        data: data_cs,
        error: error_cs,
        mutate: mutateChapters,
        isLoading: chaptersLoading,
    } = useSWR<{ chapters: Chapter[] }>(novel ? key_cs : null, axiosFetcher);

    useEffect(() => {
        setLoading(novelsLoading || chaptersLoading);
    }, [novelsLoading, chaptersLoading]);

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

        // TODO: This throws error on every action on website. Its annoying need to come up with a solution.
        // if (error_c && axios.isAxiosError(error_c)) {
        //     switch (error_c.response?.status) {
        //         case 401:
        //             return addError(`Unauthorized`);
        //         case 404:
        //             return addError(`Chapters not found`);
        //         case 500:
        //             return addError(`Internal server error`);
        //         default:
        //             return addError(
        //                 `An error occurred while fetching Chapters`,
        //             );
        //     }
        // }
        setLoading(false);
    }, [error_n]);

    async function refreshAllChapters() {
        try {
            await mutateChapters();
        } catch (err) {
            HandleErr(err);
        }
    }

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
                chapters: data_cs?.chapters ?? [],
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
