import api from "./apiService";

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
