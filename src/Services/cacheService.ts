import { Cache } from "swr";

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
