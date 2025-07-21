import axios from "axios";
import { Chapter, Novel } from "../Types/types";
import api from "./apiService";

const handleErr = (err: any) => {
    if (axios.isAxiosError(err)) {
        throw new Error(err.response?.statusText || err.message);
    } else {
        throw new Error(err.message);
    }
};

export const updateNovel = async (novel: Novel) => {
    try {
        const response = await api.put(`/manage/${novel.id}`, novel, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        handleErr(err);
    }
};

export const updateChapter = async (id_novel: string, chapter: Chapter) => {
    try {
        const response = await api.put(
            `/manage/${id_novel}/${chapter.id}`,
            chapter,
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (err) {
        handleErr(err);
    }
};
