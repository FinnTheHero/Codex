import axios from "axios";

export const HandleErr = (err: any, key?: string) => {
    if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
            case 401:
                throw new Error(`Unauthorized`);
            case 404:
                throw new Error(`Resource not found`);
            case 500:
                throw new Error(`Internal server error`);
            default:
                throw new Error(`An error occurred while fetching ${key}`);
        }
    } else {
        throw new Error(
            `An error occurred while fetching ${key}: ${err.message}`,
        );
    }
};
