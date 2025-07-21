import axios from "axios";
import api from "./apiService";

const handleErr = (err: any) => {
    if (axios.isAxiosError(err)) {
        throw new Error(err.response?.statusText || "Unknown Error");
    } else {
        throw new Error("Unknown Error");
    }
};

export const searchChapter = async (novel: string, chapter: string) => {
    try {
        if (novel === undefined || chapter === undefined) {
            throw new Error("Novel or chapter title not provided!");
        }

        if (novel === "" || chapter === "") {
            throw new Error("Novel or chapter title not provided!");
        }

        const response = await api.get(`/${novel}/${chapter}`);
        return response.data;
    } catch (err) {
        handleErr(err);
    }
};

export const searchAllChapters = async (novel: string) => {
    try {
        if (novel === undefined || novel === "") {
            throw new Error("Novel title not provided!");
        }

        const response = await api.get(`/${novel}/all`);
        return response.data;
    } catch (err) {
        handleErr(err);
    }
};

export const searchNovel = async (novel: string) => {
    try {
        if (novel === undefined || novel === "") {
            throw new Error("Novel title not provided!");
        }

        const response = await api.get(`/${novel}`);
        return response.data;
    } catch (err) {
        handleErr(err);
    }
};

export const searchAllNovels = async () => {
    try {
        const response = await api.get(`/all`);
        return response.data;
    } catch (err) {
        handleErr(err);
    }
};
