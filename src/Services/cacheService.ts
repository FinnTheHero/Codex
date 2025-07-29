import useSWR, { Cache } from "swr";
import { Chapter, Novel } from "../Types/types";
import { axiosFetcher } from "./apiService";

export function GetAllChapters(novelId: string | null) {
    const key = novelId ? `/${novelId}/all` : null;
    const { data, error, isLoading, mutate } = useSWR<Chapter[]>(
        key,
        axiosFetcher,
    );

    return {
        chapters: data ?? [],
        error,
        isLoading,
        mutate,
    };
}

export function GetAllNovels() {
    const { data, error, isLoading, mutate } = useSWR<Novel[]>(
        "/all",
        axiosFetcher,
    );

    return {
        chapters: data ?? [],
        error,
        isLoading,
        mutate,
    };
}

export function localStorageProvider(cacheKey = "app-cache") {
    return (previousCache: Readonly<Cache<any>>): Cache<any> => {
        // Read persisted entries if available
        const map = new Map<string, any>(
            JSON.parse(localStorage.getItem(cacheKey) || "[]"),
        );

        window.addEventListener("beforeunload", () => {
            localStorage.setItem(
                cacheKey,
                JSON.stringify(Array.from(map.entries())),
            );
        });

        return map;
    };
}

export function localSyncProvider(cacheKey = "app-cache") {
    return (previousCache: Readonly<Cache<any>>): Cache<any> => {
        const map = new Map<string, any>(
            JSON.parse(localStorage.getItem(cacheKey) || "[]"),
        );

        window.addEventListener("storage", (event) => {
            if (event.key === cacheKey && event.newValue) {
                const updated = new Map<string, any>(
                    JSON.parse(event.newValue),
                );
                map.clear();
                for (const [k, v] of updated) {
                    map.set(k, v);
                }
            }
        });

        window.addEventListener("beforeunload", () => {
            localStorage.setItem(
                cacheKey,
                JSON.stringify(Array.from(map.entries())),
            );
        });

        return map;
    };
}
