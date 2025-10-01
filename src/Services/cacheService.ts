import { Cache } from "swr";
import { ChapterProgress } from "../Types/types";

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

const STORAGE_KEY = "chapter_progress";

export const getAllProgress = (): Record<string, ChapterProgress> => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error("Failed to load progress:", error);
        return {};
    }
};

export const getChapterProgress = (
    chapterId: string,
): ChapterProgress | null => {
    const allProgress = getAllProgress();
    return allProgress[chapterId] || null;
};

export const saveChapterProgress = (
    chapterId: string,
    progress: number,
    scrollPosition?: number,
): void => {
    try {
        const allProgress = getAllProgress();

        allProgress[chapterId] = {
            chapterId,
            progress: Math.min(Math.max(progress, 0), 100),
            lastUpdated: Date.now(),
            scrollPosition,
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
        console.error("Failed to save progress:", error);
    }
};

export const deleteChapterProgress = (chapterId: string): void => {
    try {
        const allProgress = getAllProgress();
        delete allProgress[chapterId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
        console.error("Failed to delete progress:", error);
    }
};

export const clearAllProgress = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Failed to clear progress:", error);
    }
};
