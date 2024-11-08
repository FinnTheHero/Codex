import axios from "axios";

/*
Search for specific novels and chapters
Args: Novel title and chapter title, both string
If `Novel` title is empty it will list all the novels
If `Chapter` title is empty it will return just novel details
*/
const url = process.env.REACT_APP_API;

export const search = async (novel: string, chapter: string) => {
    try {
        if (!url) {
            throw new Error("API Not Found!");
        }

        if (novel === undefined || chapter === undefined) {
            throw new Error("Bad Request!");
        }

        let searchTerm = "";
        if (novel !== "") {
            searchTerm = novel;
            if (chapter !== "") {
                searchTerm += `/${chapter}`;
            }
        } else {
            searchTerm = "all";
        }

        const response = await axios.get(`${url}/${searchTerm}`);
        return response.data;
    } catch (err) {
        throw new Error("Couldn't find content!");
    }
};
