import axios from "axios";

const url = process.env.REACT_APP_API;

const api = axios.create({
    baseURL: `${url}`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosFetcher = async <T = unknown>(url: string): Promise<T> => {
    return await api.get<T>(url).then((response) => response.data);
};

export default api;
