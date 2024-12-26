import api from "./apiService";

export const authenticate = async () => {
    try {
        const response = await api.get("/auth/validate", {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const login = async (email: string, password: string) => {
    try {
        if (email === "" || password === "") {
            throw new Error("Provide email and password!");
        }

        const response = await api.post(
            "/auth/login",
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
        throw err;
    }
};

export const register = async (
    username: string,
    email: string,
    password: string,
) => {
    try {
        const response = await api.post(
            "/auth/register",
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
        throw new Error("Couldn't register user: " + (err as Error).message);
    }
};
