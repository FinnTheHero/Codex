import axios from "axios";

export const search = async (novel: string, chapter: string) => {
    try {
        const api = process.env.REACT_APP_API;
        if (!api) {
            throw new Error("API Not Found!");
        }

        if (novel === undefined || chapter === undefined) {
            throw new Error("Bad Request!");
        }

        if (novel === "") {
            novel = "all";
        }

        let searchTerm = novel;
        if (chapter !== "") {
            searchTerm += `/${chapter}`;
        }

        const response = await axios.get(`${api}/${searchTerm}`);
        return response.data;
    } catch (err) {
        throw new Error("Nothing Found!");
    }
};
