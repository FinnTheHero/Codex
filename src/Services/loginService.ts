import api from "./apiService";

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
        throw new Error("Email or password are incorrect!");
    }
};
