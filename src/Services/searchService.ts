import axios from "axios";

/*
Search for specific novels and chapters
Args: Novel title and chapter title, both string
If `Novel` title is empty it will list all the novels
If `Chapter` title is empty it will return just novel details
*/
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
        throw new Error("Couldn't find content!");
    }
};
