import axios from "axios";
import api from "./apiService";

export const authenticate = async () => {
    try {
        const response = await api.get("/user/validate", {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.statusText || "Unknown Error");
        } else {
            throw new Error("Unknown Error");
        }
    }
};

export const login = async (email: string, password: string) => {
    try {
        if (email === "" || password === "") {
            throw new Error("Provide email and password!");
        }

        const response = await api.post(
            "/user/login",
            {
                email,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            },
        );
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.statusText || "Unknown Error");
        } else {
            throw new Error("Unknown Error");
        }
    }
};

export const register = async (
    username: string,
    email: string,
    password: string,
) => {
    try {
        const response = await api.post(
            "/user/register",
            {
                username,
                email,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            },
        );
        return response;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.statusText || "Unknown Error");
        } else {
            throw new Error("Unknown Error");
        }
    }
};
