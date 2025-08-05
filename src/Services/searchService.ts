import axios from "axios";
import { useError } from "../Contexts/ErrorContext";
import api from "./apiService";
import { HandleErr } from "./errorHandler";

export const searchChapter = async (novel: string, chapter: string) => {
    try {
        if (novel === undefined || chapter === undefined) {
            throw new Error("Novel or chapter id not provided!");
        }

        if (novel === "" || chapter === "") {
            throw new Error("Novel or chapter id not provided!");
        }

        const response = await api.get(`/${novel}/${chapter}`);
        return response.data;
    } catch (err) {
        HandleErr(err);
    }
};

export const searchAllChapters = async (novel: string) => {
    try {
        if (novel === undefined || novel === "") {
            throw new Error("Novel id not provided!");
        }

        const response = await api.get(`/${novel}/all`);
        return response.data;
    } catch (err) {
        HandleErr(err);
    }
};

export const searchNovel = async (novel: string) => {
    try {
        if (novel === undefined || novel === "") {
            throw new Error("Novel id not provided!");
        }

        const response = await api.get(`/${novel}`);
        return response.data;
    } catch (err) {
        HandleErr(err);
    }
};

export const searchAllNovels = async () => {
    try {
        const response = await api.get(`/all`);
        return response.data;
    } catch (err) {
        HandleErr(err);
    }
};
