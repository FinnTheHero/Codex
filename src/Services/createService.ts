import axios from "axios";
import { Chapter, Novel } from "../Types/types";
import api from "./apiService";
import { HandleErr } from "./errorHandler";

export const createNovel = async (novel: Novel) => {
    try {
        const response = await api.post(`/manage/novel`, novel, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        HandleErr(err);
    }
};

export const createChapter = async (id_novel: string, chapter: Chapter) => {
    try {
        const response = await api.post(
            `/manage/${id_novel}/chapter`,
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
