import axios from "axios";

const url = process.env.REACT_APP_API;

const api = axios.create({
    baseURL: `${url}`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            throw new Error("Unauthorized!");
        }
        return Promise.reject(error);
    },
);

export default api;
