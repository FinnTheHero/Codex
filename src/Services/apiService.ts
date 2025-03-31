import axios from "axios";

const url = process.env.REACT_APP_API;

const api = axios.create({
    baseURL: `${url}`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
