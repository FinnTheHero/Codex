import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API;

const api = axios.create({
    baseURL: `${url}/auth`,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const navigate = useNavigate();
            navigate("/login");
        }
        return Promise.reject(error);
    },
);

export default api;
