import axios from "axios";

export const HandleErr = (err: any, key?: string) => {
    if (err == null) {
        throw new Error(`An error occurred while fetching ${key ?? "unknown"}`);
    }

    if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
            case 401:
                throw new Error(`Unauthorized`);
            case 404:
                throw new Error(`Resource not found`);
            case 500:
                throw new Error(`Internal server error`);
            case 301:
                throw new Error(`Illegal Redirect`);
            default:
                throw new Error(
                    `An error occurred while fetching ${key ?? "unknown"}`,
                );
        }
    } else {
        const errorMessage = err?.message || "Unknown error";
        throw new Error(
            `An error occurred while fetching ${key ?? "unknown"}: ${errorMessage}`,
        );
    }
};
