import axios from "axios";
import { Chapter, Novel } from "../Types/types";
import api from "./apiService";
import { HandleErr } from "./errorHandler";

export const updateNovel = async (novel: Novel) => {
    try {
        const response = await api.put(`/manage/${novel.id}`, novel, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        HandleErr(err);
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
        HandleErr(err);
    }
};
