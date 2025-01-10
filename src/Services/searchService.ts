import axios from "axios";
import api from "./apiService";

export const searchChapter = async (novel: string, chapter: string) => {
    try {
        if (novel === undefined || chapter === undefined) {
            throw new Error("Novel or chapter title not provided!");
        }

        if (chapter === "") {
            chapter = "all";
        }

        const response = await api.get(`/${novel}/${chapter}`);
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.statusText || "Unknown Error");
        } else {
            throw new Error("Unknown Error");
        }
    }
};

export const searchNovel = async (novel: string) => {
    try {
        if (novel === undefined) {
            throw new Error("Novel title not provided!");
        }

        if (novel === "") {
            novel = "all";
        }

        const response = await api.get(`/${novel}`);
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.statusText || "Unknown Error");
        } else {
            throw new Error("Unknown Error");
        }
    }
};
