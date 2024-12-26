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
        throw new Error("Couldn't find Chapter(s)!");
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
        throw new Error("Couldn't find Novel(s)!");
    }
};
