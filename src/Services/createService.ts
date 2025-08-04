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

export const createNovel = async (novel: Novel) => {
    try {
        const response = await api.post(`/manage/novel`, novel, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        handleErr(err);
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
        handleErr(err);
    }
};
