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
